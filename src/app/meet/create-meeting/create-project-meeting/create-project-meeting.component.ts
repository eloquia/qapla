import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { WarningToastConfig } from 'src/app/core/models';

import { Project } from 'src/app/project/models';
import { ProjectService } from 'src/app/project/project.service';
import { MeetService } from '../../meet.service';
import { CreateProjectMeetingRequest } from '../../models';

@Component({
  selector: 'app-create-project-meeting',
  templateUrl: './create-project-meeting.component.html',
  styleUrls: ['./create-project-meeting.component.scss']
})
export class CreateProjectMeetingComponent implements OnInit {

  public isFormValid: boolean = false;
  projects$: Observable<Project[]> = this.projectService.projects$;

  createProjectMeetingForm = this.formBuilder.group({
    projects: [''],
    date: [''],
    startTime: [''],
    duration: [''],
  });

  createFormSub: Subscription = this.meetingService.successCreateFormEvent$
    .subscribe(() => {
      this.resetForm();
    });

  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private meetingService: MeetService,
    private toasterService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.projectService.getAllProjects();
  }

  public scheduleMeeting(): void {
    if (!this.validateForm()) {
      this.toasterService.warning(
        `Fields are missing/invalid`,
        `Cannot Schedule Meeting`,
        {
          progressBar: true,
          closeButton: true,
          timeOut: 3000,
          positionClass: 'toast-bottom-center',
        }
      );
    } else {
      const date = this.createProjectMeetingForm.get('date')?.value;
      const dateParts = date.split('-');
      const year = dateParts[0];
      const month = dateParts[1];
      const day = dateParts[2];

      const startTime = this.createProjectMeetingForm.get('startTime')?.value;
      const startTimeParts = startTime.split(':')
      const startHour = startTimeParts[0];
      const startMinute = startTimeParts[1];

      // duration is either 15, 30, 45, or 60
      const duration = this.createProjectMeetingForm.get('duration')?.value;
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

      const projectIds = this.createProjectMeetingForm.get('projects')?.value;

      const createMeetingRequest: CreateProjectMeetingRequest = {
        year,
        month,
        day,
        startHour,
        startMinute,
        endHour,
        endMinute,
        projectIds,
      }
      console.log('createMeetingRequest', createMeetingRequest)
      this.meetingService.createMeeting(createMeetingRequest);
    }
  }

  private resetForm(): void {
    this.createProjectMeetingForm.reset();
  }

  private validateForm(): boolean {
    return !!this.createProjectMeetingForm.get('date')?.value
      && !!this.createProjectMeetingForm.get('projects')?.value
      && this.createProjectMeetingForm.get('startTime')?.value
      && this.createProjectMeetingForm.get('duration')?.value;
  }

}
