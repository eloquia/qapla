import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, combineLatest, Observable, Subject, Subscription, throwError } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SuccessToastConfig, WarningToastConfig } from 'src/app/core/models';
import { Personnel } from 'src/app/personnel/models';
import { PersonnelService } from 'src/app/personnel/personnel.service';
import { ProfileService } from 'src/app/profile.service';
import { Project } from 'src/app/project/models';
import { ProjectService } from 'src/app/project/project.service';
import { MeetService } from '../meet.service';
import { Meeting } from '../models/common';
import { CreateMeetingRequest } from '../models/requests';

@Injectable()
export class CreateMeetingService {

  // -------------------------------
  //            Data Store
  // -------------------------------

  public personnels$: Observable<Personnel[]> = this.personnelService.personnel$;
  public projects$: Observable<Project[]> = this.projectSerivce.projects$;

  // -------------------------------
  //  Keep track of meeting details
  // -------------------------------

  private meetingNameSubject_: Subject<string> = new BehaviorSubject<string>('');
  public meetingName$: Observable<string> = this.meetingNameSubject_.asObservable();

  private meetingDateSubject_: Subject<DateTime> = new BehaviorSubject<DateTime>(DateTime.invalid('invalid date'));
  public meetingDate$: Observable<DateTime> = this.meetingDateSubject_.asObservable();

  private meetingStartTimeSubject_: Subject<DateTime> = new BehaviorSubject<DateTime>(DateTime.invalid('invalid time'));
  public meetingStartTime$: Observable<DateTime> = this.meetingStartTimeSubject_.asObservable();

  private meetingDurationSubject_: Subject<number> = new BehaviorSubject<number>(0);
  public meetingDuration$: Observable<number> = this.meetingDurationSubject_.asObservable();

  private meetingTypeSubject_: BehaviorSubject<string> = new BehaviorSubject<string>('People');
  public meetingType$: Observable<string> = this.meetingTypeSubject_.asObservable();

  private selectedPersonnelSubject_: Subject<Personnel[]> = new BehaviorSubject<Personnel[]>([]);
  public selectedPersonnel$: Observable<Personnel[]> = this.selectedPersonnelSubject_.asObservable();
  private selectedProjectsSubject_: Subject<Project[]> = new BehaviorSubject<Project[]>([]);
  public selectedProjects$: Observable<Project[]> = this.selectedProjectsSubject_.asObservable();

  public isCreateMeetingValid$: Observable<boolean> = combineLatest([
    this.meetingDateSubject_,
    this.meetingStartTimeSubject_,
    this.meetingDurationSubject_,
    this.selectedPersonnelSubject_,
    this.selectedProjectsSubject_,
  ]).pipe(
    map<[DateTime, DateTime, number, Personnel[], Project[]], boolean>(v => {
      /*
        In order to Create Meeting, the following criteria needs to be satsified:
        * MeetingDateTime cannot be in the past
        * MeetingDuration must be greater than 0
        * Either Personnels or Projects must be non-empty
      */
     const tz = DateTime.local().toFormat('z');

     let selectedDateTime: DateTime = DateTime.invalid('must be invalid');

     try {
      selectedDateTime = DateTime.fromObject({
        year: parseInt(v[0].toFormat('yyyy')),
        month: parseInt(v[0].toFormat('MM')),
        day: parseInt(v[0].toFormat('dd')),
        hour: parseInt(v[1].toFormat('HH')),
        minute: parseInt(v[1].toFormat('mm')),
      }, {
        zone: tz,
      });
     } catch (e) {
       console.warn(e)
       return false;
     }

      if (!selectedDateTime.isValid) {
        console.warn('selecteDateTime invalid', selectedDateTime.invalidReason)
        console.warn('invalid selecteDateTime', selectedDateTime)
        return false;
      }

      if (selectedDateTime < DateTime.now()) {
        console.warn('Selected DateTime is before now', selectedDateTime)
        return false;
      }

      if (!(v[2] > 0)) {
        console.warn('Duration is invalid', v[2])
        return false;
      }

      // for projects & personnels
      // There must be one or the other
      // One or the other must be non-zero in length
      if (!v[3] && !v[4]) {
        // neither exist
        console.warn('Personnels or Projects must exist', v[3], v[4])
        return false;
      }
      if (v[3] && v[4] && v[3].length && v[4].length) {
        // both exist
        console.warn('One of Personnels or Projects must exist', v[3], v[4])
        return false;
      }
      if (this.meetingTypeSubject_.value === 'People' && v[3].length === 0) {
        console.warn('People meeting was chosen, but did not specify any people', v[3])
        return false;
      }
      if (this.meetingTypeSubject_.value === 'Project' && v[4].length === 0) {
        console.warn('Project meeting was chosen, but did not specify any projects', v[4])
        return false;
      }

      return true;
    })
  );

  // -------------------------------
  //              Events
  // -------------------------------
  private createMeetingEventSubject_: Subject<void> = new Subject<void>();
  public createMeetingEventSubscription$: Subscription = this.createMeetingEventSubject_.asObservable()
    .pipe(
      withLatestFrom(
        combineLatest([
          this.meetingNameSubject_,
          this.meetingDateSubject_,
          this.meetingStartTimeSubject_,
          this.meetingDurationSubject_,
          this.selectedPersonnelSubject_,
          this.selectedProjectsSubject_,
        ])
      ),
      switchMap((v => {
        let createMeetingRequest: CreateMeetingRequest;
        const name = v[1][0];
        const meetingStartDate = v[1][1];
        const meetingStartTime = v[1][2];
        const meetingDurationMinutes = v[1][3];
        const personnels = v[1][4];
        const projects = v[1][5];

        // console.log('meetingStartDate', meetingStartDate)
        // console.log('meetingStartTime', meetingStartTime)

        const startDateDt = DateTime.fromFormat(`${meetingStartDate.toFormat('yyyy-MM-dd')} ${meetingStartTime.toFormat('HH:mm')}:00`, 'yyyy-MM-dd HH:mm:ss');
        // console.log('startDateDt', startDateDt);
        const startDate: string = startDateDt.toISO();
        // console.log('startDate', startDate);
        const endDateDt = DateTime.fromFormat(`${meetingStartDate.toFormat('yyyy-MM-dd')} ${meetingStartTime.toFormat('HH:mm')}:00`, 'yyyy-MM-dd HH:mm:ss')
        .plus({ minutes: meetingDurationMinutes });
        // console.log('endDateDt', endDateDt);
        const endDate: string = endDateDt.toISO();
        // console.log('endDate', endDate);
        const createdBy = this.profileService.getUserId();
        if (!createdBy) {
          return throwError(() => `Invalid Create Meeting data: ${v}`)
        }

        if (!startDate) {
          return throwError(() => `Invalid Create Meeting start date: ${startDate}`)
        }

        if (!endDate) {
          return throwError(() => `Invalid Create Meeting end date: ${endDate}`)
        }
        
        if (this.meetingTypeSubject_.value === 'People') {
          const createPersonnelMeetingRequest: CreateMeetingRequest = {
            name,
            startDate,
            // endDate,
            durationMinutes: meetingDurationMinutes,
            createdBy,
            personnelIds: personnels.map(p => p.id),
          }

          createMeetingRequest = createPersonnelMeetingRequest;
        } else if (this.meetingTypeSubject_.value === 'Project') {
          const createProjectMeetingRequest: CreateMeetingRequest = {
            name,
            startDate,
            // endDate,
            durationMinutes: meetingDurationMinutes,
            createdBy,
            projectIds: projects.map(p => p.id)
          }

          createMeetingRequest = createProjectMeetingRequest;
        } else {
          return throwError(() => `Invalid Create Meeting data: ${v}`)
        }

        return this.httpClient.post<Meeting>(
          'http://localhost:8080/meeting',
          createMeetingRequest
        );
      }))
    )
    .subscribe({
      next: (v) => {
        this.toasterService.success(
          `Meeting Scheduled`,
          `Success`,
          SuccessToastConfig
        );
        this.resetCreateMeeting();
      },
      error: (e) => {
        console.warn(e)
        this.toasterService.warning(
          `${e.error}`,
          `Could not schedule meeting`,
          WarningToastConfig
        )
      }
    });

  constructor(
    private router: Router,
    private projectSerivce: ProjectService,
    private personnelService: PersonnelService,
    private meetingService: MeetService,
    private httpClient: HttpClient,
    private toasterService: ToastrService,
    private profileService: ProfileService,
  ) { }

  public choosePeopleMeeting(): void {
    this.meetingTypeSubject_.next('People');
  }

  public chooseProjectMeeting(): void {
    this.fetchProjectsAction();
    this.meetingTypeSubject_.next('Project');
  }

  // -------------------------------
  //       Update Store Values
  // -------------------------------

  public updateChosenPeople(people: Personnel[]): void {
    this.selectedPersonnelSubject_.next(people);
  }

  public updateChosenProjects(projects: Project[]): void {
    this.selectedProjectsSubject_.next(projects);
  }

  public updateMeetingName(name: string): void {
    this.meetingNameSubject_.next(name);
  }

  public updateMeetingDate(d: DateTime): void {
    this.meetingDateSubject_.next(d);
  }

  public updateMeetingTime(t: DateTime): void {
    this.meetingStartTimeSubject_.next(t)
  }

  public updateMeetingDuration(d: number): void {
    this.meetingDurationSubject_.next(d);
  }

  private navigateNext(): void {
    this.router.navigate(['/meet/create/details'])
  }

  // -------------------------------
  //            Data Store
  // -------------------------------

  public fetchProjectsAction(): void {
    this.projectSerivce.getAllProjects();
  }

  public fetchPersonnelsAction(): void {
    console.log('fetchPersonnelsAction()');
  }

  resetCreateMeeting(): void {
    console.log('resetCreateMeeting')
    this.meetingDateSubject_.next(DateTime.invalid('invalid date'));
    this.meetingStartTimeSubject_.next(DateTime.invalid('invalid time'));
    this.meetingDurationSubject_.next(0);
    this.selectedPersonnelSubject_.next([]);
    this.selectedProjectsSubject_.next([]);
    this.meetingNameSubject_.next('');
  }

  scheduleMeeting(): void {
    this.createMeetingEventSubject_.next();
  }

}
