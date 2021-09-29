import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Personnel } from 'src/app/personnel/models';
import { ProfileService } from 'src/app/profile.service';
import { Project } from 'src/app/project/models';
import { MeetService } from '../meet.service';
import { CreatePeopleMeetingRequest, CreateProjectMeetingRequest } from '../models/requests';

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

  people$: Observable<Personnel[]> = this.createMeetingService.personnels$
    .pipe(
      map(personnels => {
        return personnels
          .map(personnel => {
            return {
              ...personnel,
              name: `${personnel.firstName} ${personnel.lastName}`
            }
          })
          .sort((a, b) => {
            const nameA = a.lastName.toUpperCase(); // ignore upper and lowercase
            const nameB = b.lastName.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            // names must be equal
            return 0;
          })
      })
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
  ) {}

  ngOnInit(): void {}

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
    console.log('scheduleMeeting')
    const createdBy = this.profileService.getUserId();

    const durationParts: string[] = this.meetingDuration.split(' ');

    const start = DateTime.fromFormat(`${this.startDate} ${this.meetingTime}`, 'yyyy-MM-dd HH:mm');
    console.log('start', start)
    console.log('start ISO', start.toISO())

    let endDate: DateTime;
    if (durationParts[0] === '1') {
      endDate = DateTime.fromISO(start.toISO())
        .plus({ hours: 1 });
    } else {
      const startDateISOString = start.toISO()
      console.log('startDateISOString', startDateISOString)
      endDate = DateTime.fromISO(startDateISOString)
        .plus({ minutes: parseInt(durationParts[0]) });
    }

    // project or personnel
    if (this.meetingType === 'People') {
      const meetingDetails: CreatePeopleMeetingRequest = {
        name: this.meetingName,
        startDate: start.toISO(),
        endDate: endDate.toISO(),
        createdBy,
        personnelIds: this.chosenPeople.map(person => person.id),
      };
      this.meetService.createMeeting(meetingDetails);
    } else if (this.meetingType === 'Project') {
      console.log('chosen chosenProjects', this.chosenProjects)
      const meetingDetails: CreateProjectMeetingRequest = {
        name: this.meetingName,
        startDate: start.toISO(),
        endDate: endDate.toISO(),
        createdBy,
        projectIds: []
      };
      console.log('createPeopleMeetingRequest', meetingDetails)
    } else {
      console.warn('Unknown meeting type:', this.meetingType)
    }
  }

}
