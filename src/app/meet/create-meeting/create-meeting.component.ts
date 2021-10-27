import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Personnel } from 'src/app/personnel/models';
import { ProfileService } from 'src/app/profile.service';
import { Project } from 'src/app/project/models';
import { MeetingActionTypes } from 'src/app/stores/meeting/actions';
import { selectMeetingType } from 'src/app/stores/meeting/selectors';
import { IMeetingState } from 'src/app/stores/meeting/state';
import { PersonnelActionTypes } from 'src/app/stores/personnel/actions';
import { selectPersonnelList } from 'src/app/stores/personnel/selectors';
import { IPersonnelState } from 'src/app/stores/personnel/state';
import { CreateMeetingRequest } from '../models/requests';
import { CreateMeetingService } from './create-meeting.service';

/**
 * https://github.com/danmt/dynamic-component-loader
 */
@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.scss'],
  providers: [CreateMeetingService],
})
export class CreateMeetingComponent implements OnInit {

  // -- -- -- -- -- -- -- -- -- --
  //        Second Page Data
  // -- -- -- -- -- -- -- -- -- --

  isValid$: Observable<boolean> = this.createMeetingService.isCreateMeetingValid$;
  meetingType$: Observable<'Project' | 'Personnel'> = this.meetingStore.select(selectMeetingType);

  people$: Observable<any[]> = this.personnelStore.select(selectPersonnelList)
    .pipe(
      map(pList => pList.map(person => {
        const p = {
          ...person,
          fullName: `${person.firstName} ${person.lastName}`
        }
        return p
      }))
    );

  projects$: Observable<Project[]> = this.createMeetingService.projects$;

  meetingName: string = '';
  startDate: DateTime = DateTime.now();
  meetingTime: DateTime = DateTime.now();
  chosenPeople: Personnel[] = [];
  chosenProjects: Project[] = [];
  meetingDuration: string = '30 minutes';

  constructor(
    private createMeetingService: CreateMeetingService,
    private profileService: ProfileService,
    private personnelStore: Store<IPersonnelState>,
    private meetingStore: Store<IMeetingState>,
  ) {}

  ngOnInit(): void {
    this.personnelStore.dispatch({ type: PersonnelActionTypes.GET_PERSONNEL_LIST })
  }

  // -- -- -- -- -- -- -- -- -- --
  //          First Page
  // -- -- -- -- -- -- -- -- -- --

  public handleChoosePeopleMeeting(): void {
    this.createMeetingService.choosePeopleMeeting();
  }

  public handleChooseProjectMeeting(): void {
    this.createMeetingService.chooseProjectMeeting();
  }

  // -- -- -- -- -- -- -- -- -- --
  //      Second Page Actions
  // -- -- -- -- -- -- -- -- -- --

  // -- -- -- -- -- -- -- -- -- --
  //      Third Page Actions
  // -- -- -- -- -- -- -- -- -- --

  scheduleMeeting(): void {
    const createdBy = this.profileService.getUserId();

    const durationParts: string[] = this.meetingDuration.split(' ');

    const start = DateTime.fromFormat(`${this.startDate} ${this.meetingTime}`, 'yyyy-MM-dd HH:mm');

    // project or personnel
    // if (this.meetingType === 'People') {
    //   const meetingDetails: CreatePeopleMeetingData = {
    //     name: this.meetingName,
    //     startDate: start.toISO(),
    //     durationMinutes: parseInt(durationParts[0]),
    //     createdBy,
    //     personnelIds: this.chosenPeople.map(person => `${person.id}`),
    //   };
    //   console.log('createPeopleMeetingRequest', meetingDetails)
    //   this.personnelStore.dispatch({ type: MeetingActionTypes.CREATE_PERSONNEL_MEETING, createPeopleMeetingRequest: meetingDetails })
    // } else if (this.meetingType === 'Project') {
    //   const meetingDetails: CreateProjectMeetingData = {
    //     name: this.meetingName,
    //     startDate: start.toISO(),
    //     durationMinutes: parseInt(durationParts[0]),
    //     createdBy,
    //     projectIds: this.chosenProjects.map(project => `${project.id}`)
    //   };
    //   console.log('createProjectMeetingRequest', meetingDetails)
    //   this.personnelStore.dispatch({ type: MeetingActionTypes.CREATE_PROJECT_MEETING, createProjectMeetingRequest: meetingDetails })
    // } else {
    //   console.warn('Unknown meeting type:', this.meetingType)
    // }

    const meetingDetails = {
      name: this.meetingName,
      startDate: start.toISO(),
      createdBy,
      durationMinutes: parseInt(durationParts[0]),
      personnelIds: [''],
      projectIds: [''],
    }

    if (!!this.chosenPeople && !!this.chosenPeople.length) {
      meetingDetails.personnelIds = this.chosenPeople.map(person => `${person.id}`);
    } else if (!!this.chosenProjects && !!this.chosenProjects.length) {
      meetingDetails.projectIds = this.chosenProjects.map(project => `${project.id}`);
    } else {
      // TODO: handle create empty meeting
      console.warn('Personnel or Projects must be added to a meeting')
      return;
    }
    console.log('[LOG] Scheduling meeting with details', meetingDetails)

    this.personnelStore.dispatch({ type: MeetingActionTypes.CREATE_MEETING, meetingData: meetingDetails });
  }

}
