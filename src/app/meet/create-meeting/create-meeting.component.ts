import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Personnel } from 'src/app/personnel/models';
import { ProfileService } from 'src/app/profile.service';
import { Project } from 'src/app/project/models';
import { MeetingActionTypes } from 'src/app/stores/meeting/actions';
import { PersonnelActionTypes } from 'src/app/stores/personnel/actions';
import { selectPersonnelList } from 'src/app/stores/personnel/selectors';
import { IPersonnelState } from 'src/app/stores/personnel/state';
import { MeetService } from '../meet.service';
import { CreatePeopleMeetingData, CreatePeopleMeetingRequest, CreateProjectMeetingData, CreateProjectMeetingRequest } from '../models/requests';

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
  meetingType: string = 'People';

  people$: Observable<any[]> = this.store.select(selectPersonnelList)
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

  // -- -- -- -- -- -- -- -- -- --
  //        Second Page Data
  // -- -- -- -- -- -- -- -- -- --

  meetingName: string = '';
  startDate: DateTime = DateTime.now();
  meetingTime: DateTime = DateTime.now();
  chosenPeople: Personnel[] = [];
  chosenProjects: Project[] = [];
  meetingDuration: string = '30 minutes';

  constructor(
    private createMeetingService: CreateMeetingService,
    private meetService: MeetService,
    private profileService: ProfileService,
    private store: Store<IPersonnelState>,
  ) {}

  ngOnInit(): void {
    this.store.dispatch({ type: PersonnelActionTypes.GET_PERSONNEL_LIST })
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

  public handlePeopleChange($event: any) {
    this.createMeetingService.updateChosenPeople($event.value)
  }

  public handleProjectChange($event: any) {
    this.createMeetingService.updateChosenProjects($event.value)
  }

  // -- -- -- -- -- -- -- -- -- --
  //      Third Page Actions
  // -- -- -- -- -- -- -- -- -- --

  scheduleMeeting(): void {
    const createdBy = this.profileService.getUserId();

    const durationParts: string[] = this.meetingDuration.split(' ');

    const start = DateTime.fromFormat(`${this.startDate} ${this.meetingTime}`, 'yyyy-MM-dd HH:mm');

    // project or personnel
    if (this.meetingType === 'People') {
      const meetingDetails: CreatePeopleMeetingData = {
        name: this.meetingName,
        startDate: start.toISO(),
        durationMinutes: parseInt(durationParts[0]),
        createdBy,
        personnelIds: this.chosenPeople.map(person => `${person.id}`),
      };
      console.log('createPeopleMeetingRequest', meetingDetails)
      this.store.dispatch({ type: MeetingActionTypes.CREATE_PERSONNEL_MEETING, createPeopleMeetingRequest: meetingDetails })
    } else if (this.meetingType === 'Project') {
      const meetingDetails: CreateProjectMeetingData = {
        name: this.meetingName,
        startDate: start.toISO(),
        durationMinutes: parseInt(durationParts[0]),
        createdBy,
        projectIds: this.chosenProjects.map(project => `${project.id}`)
      };
      console.log('createProjectMeetingRequest', meetingDetails)
      this.store.dispatch({ type: MeetingActionTypes.CREATE_PROJECT_MEETING, createProjectMeetingRequest: meetingDetails })
    } else {
      console.warn('Unknown meeting type:', this.meetingType)
    }
  }

}
