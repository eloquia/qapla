import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { WarningToastConfig } from 'src/app/core/models';
import { Personnel } from 'src/app/personnel/models';
import { PersonnelService } from 'src/app/personnel/personnel.service';
import { CreateFreeFormMeetingRequest } from '../../models';

@Component({
  selector: 'app-create-free-form-meeting',
  templateUrl: './create-free-form-meeting.component.html',
  styleUrls: ['./create-free-form-meeting.component.scss']
})
export class CreateFreeFormMeetingComponent implements OnInit {

  public isValid: boolean = false;
  createFreeFormMeetingForm = this.formBuilder.group({
    personnel: [''],
    date: [''],
    startTime: [''],
    duration: [''],
  });

  personnel$: Observable<Personnel[]> = this.personnelService.personnel$;

  constructor(
    private formBuilder: FormBuilder,
    private personnelService: PersonnelService,
    private toasterService: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  public scheduleMeeting(): void {
    console.log('scheduling free form meeting', this.createFreeFormMeetingForm);

    // check validity
    if (!this.isFormValid()) {
      this.toasterService.warning(
        `Fields are missing/invalid`,
        `Cannot Schedule Meeting`,
        WarningToastConfig,
      )
      return
    } else {
      const date = this.createFreeFormMeetingForm.get('date')?.value;
      const dateParts = date.split('-');
      const year = dateParts[0];
      const month = dateParts[1];
      const day = dateParts[2];

      const startTime = this.createFreeFormMeetingForm.get('startTime')?.value;
      const startTimeParts = startTime.split(':')
      const startHour = startTimeParts[0];
      const startMinute = startTimeParts[1];

      // duration is either 15, 30, 45, or 60
      const duration = this.createFreeFormMeetingForm.get('duration')?.value;
      const endDate = DateTime.fromFormat(`${year}-${month}-${day} ${startHour}:${startMinute}`, 'yyyy-MM-dd HH:mm')
        .plus({ minute: duration });
      const endHour = endDate.toFormat('HH');
      const endMinute = endDate.toFormat('mm');

      if (parseInt(endDate.toFormat('dd')) > parseInt(day)) {
        this.toasterService.warning(
          `Meetings must start and end on the same day`,
          `Cannot Schedule Meeting`,
          WarningToastConfig,
        );
        return
      }

      const personnel = this.createFreeFormMeetingForm.get('personnel')?.value;

      const createFreeFormMeetingRequest: CreateFreeFormMeetingRequest = {
        year,
        month,
        day,
        startHour,
        startMinute,
        endHour,
        endMinute,
        personnelIds: personnel,
      }

      console.log('createFreeFormMeetingRequest', )
    }
  }

  // -------------------- Private Functions ----------------------

  private resetForm(): void {
    this.createFreeFormMeetingForm.reset();
  }

  private isFormValid(): boolean {
    return !!this.createFreeFormMeetingForm.get('date')?.value
      && !!this.createFreeFormMeetingForm.get('personnel')?.value
      && this.createFreeFormMeetingForm.get('startTime')?.value
      && this.createFreeFormMeetingForm.get('duration')?.value;
  }

}
