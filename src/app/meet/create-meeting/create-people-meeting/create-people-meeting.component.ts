import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WarningToastConfig } from 'src/app/core/models';
import { Personnel } from 'src/app/personnel/models';
import { PersonnelService } from 'src/app/personnel/personnel.service';
import { ProfileService } from 'src/app/profile.service';
import { MeetService } from '../../meet.service';
import { MeetingNameService } from '../../meeting-name.service';
import { GOLANG_MEETING_FORMAT } from '../../models/common';
import { CreateMeetingRequest } from '../../models/requests';

@Component({
  selector: 'app-create-people-meeting',
  templateUrl: './create-people-meeting.component.html',
  styleUrls: ['./create-people-meeting.component.scss'],
})
export class CreatePeopleMeetingComponent implements OnInit {
  public isValid: boolean = false;
  createPeopleMeetingForm = this.formBuilder.group({
    name: [''],
    personnel: [''],
    date: [''],
    startTime: [''],
    duration: [''],
  });

  selectedPersonnel: Personnel[] = [];

  personnel$: Observable<Personnel[]> = this.personnelService.personnel$
    .pipe(
      map(persons => {
        const modifiedPeople = persons.map(person => {
          return {
            ...person,
            name: `${person.firstName} ${person.lastName}`,
          }
        });
        return modifiedPeople;
      })
    );

  constructor(
    private formBuilder: FormBuilder,
    private personnelService: PersonnelService,
    private toasterService: ToastrService,
    private meetingNameService: MeetingNameService,
    private meetingService: MeetService,
    private profileService: ProfileService,
    private router: Router,
  ) {}

  ngOnInit(): void { }

  public scheduleMeeting(): void {
    console.log('scheduling free form meeting', this.createPeopleMeetingForm);

    // check validity
    if (!this.isFormValid()) {
      this.toasterService.warning(
        `Fields are missing/invalid`,
        `Cannot Schedule Meeting`,
        WarningToastConfig
      );
      return;
    } else {
      const date = this.createPeopleMeetingForm.get('date')?.value;
      const dateParts = date.split('-');
      const year = dateParts[0];
      const month = dateParts[1];
      const day = dateParts[2];

      const startTime = this.createPeopleMeetingForm.get('startTime')?.value;
      const startTimeParts = startTime.split(':');
      const startHour = startTimeParts[0];
      const startMinute = startTimeParts[1];

      // duration is either 15, 30, 45, or 60
      const duration = this.createPeopleMeetingForm.get('duration')?.value;

      const startDate = DateTime.fromFormat(
        `${year}-${month}-${day} ${startHour}:${startMinute}:00`,
        'yyyy-MM-dd HH:mm:ss'
      );

      const endDate = DateTime.fromFormat(
        `${year}-${month}-${day} ${startHour}:${startMinute}`,
        'yyyy-MM-dd HH:mm'
      ).plus({ minutes: duration });

      if (parseInt(endDate.toFormat('dd')) > parseInt(day)) {
        this.toasterService.warning(
          `Meetings must start and end on the same day`,
          `Cannot Schedule Meeting`,
          WarningToastConfig
        );
        return;
      }

      const personnel = this.createPeopleMeetingForm.get('personnel')?.value;

      const createPeopleMeetingRequest: CreateMeetingRequest = {
        name: this.meetingNameService.createName({
          customName: this.createPeopleMeetingForm.get('name')?.value,
        }),
        startDate: startDate.toFormat(GOLANG_MEETING_FORMAT),
        // endDate: endDate.toFormat(GOLANG_MEETING_FORMAT),
        durationMinutes: duration,
        createdBy: this.profileService.getUserId(),
        // personnelIds: personnel,
      };

      console.log('createPeopleMeetingRequest', createPeopleMeetingRequest);

      // this.meetingService.createMeeting(createPeopleMeetingRequest);
    }
  }

  public navigateConfirm() {
    this.router.navigate(['/meet/create/confirm']);
  }

  public navigateBack() {
    this.router.navigate(['/meet/create/start']);
  }

  // -------------------- Private Functions ----------------------

  private resetForm(): void {
    this.createPeopleMeetingForm.reset();
  }

  private isFormValid(): boolean {
    return (
      !!this.createPeopleMeetingForm.get('date')?.value &&
      !!this.createPeopleMeetingForm.get('personnel')?.value &&
      this.createPeopleMeetingForm.get('startTime')?.value &&
      this.createPeopleMeetingForm.get('duration')?.value
    );
  }
}
