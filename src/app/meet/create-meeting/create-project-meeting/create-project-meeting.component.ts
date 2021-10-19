import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { WarningToastConfig } from 'src/app/core/models';
import { ProfileService } from 'src/app/profile.service';

import { Project } from 'src/app/project/models';
import { ProjectService } from 'src/app/project/project.service';
import { MeetService } from '../../meet.service';
import { MeetingNameService } from '../../meeting-name.service';
import { GOLANG_MEETING_FORMAT } from '../../models/common';
import { CreateMeetingRequest } from '../../models/requests';

@Component({
  selector: 'app-create-project-meeting',
  templateUrl: './create-project-meeting.component.html',
  styleUrls: ['./create-project-meeting.component.scss'],
})
export class CreateProjectMeetingComponent implements OnInit {
  public isValid: boolean = false;
  projects$: Observable<Project[]> = this.projectService.projects$;

  createProjectMeetingForm = this.formBuilder.group({
    projects: [''],
    date: [''],
    startTime: [''],
    duration: [''],
  });

  createFormSub: Subscription =
    this.meetingService.successCreateFormEvent$.subscribe(() => {
      this.resetForm();
    });

  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private meetingService: MeetService,
    private toasterService: ToastrService,
    private meetingNameService: MeetingNameService,
    private profileService: ProfileService,
    private router: Router,
  ) {}

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
      const date: string = this.createProjectMeetingForm.get('date')?.value;
      const dateParts: string[] = date.split('-');
      const year: string = dateParts[0];
      const month: string = dateParts[1];
      const day: string = dateParts[2];

      const startTime: string =
        this.createProjectMeetingForm.get('startTime')?.value;
      const startTimeParts: string[] = startTime.split(':');
      const startHour: string = startTimeParts[0];
      const startMinute: string = startTimeParts[1];

      // duration is either 15, 30, 45, or 60
      const duration = this.createProjectMeetingForm.get('duration')?.value;
      const startDate = DateTime.fromFormat(
        `${year}-${month}-${day} ${startHour}:${startMinute}:00`,
        'yyyy-MM-dd HH:mm:ss'
      );
      const endDate = DateTime.fromFormat(
        `${year}-${month}-${day} ${startHour}:${startMinute}:00`,
        'yyyy-MM-dd HH:mm:ss'
      ).plus({ minutes: duration });

      console.log('startDate ISO', startDate.toISO());
      console.log('endDate ISO', endDate.toISO());

      if (parseInt(endDate.toFormat('dd')) > parseInt(day)) {
        this.toasterService.warning(
          `Meetings must start and end on the same day`,
          `Cannot Schedule Meeting`,
          WarningToastConfig
        );
        return;
      }

      const projects = this.createProjectMeetingForm.get('projects')?.value;
      const projectIds = this.createProjectMeetingForm
        .get('projects')
        ?.value.map((project: Project) => project.id);

      const createdBy = this.profileService.getUserId();
      console.log('createdBy', createdBy);

      const createMeetingRequest: CreateMeetingRequest = {
        name: this.meetingNameService.createName({
          selectedProjects: projects,
        }),
        startDate: startDate.toISO(),
        // endDate: endDate.toISO(),
        durationMinutes: duration,
        createdBy,
        // projectIds,
      };

      // this.meetingService.createMeeting(createMeetingRequest);
    }
  }

  private resetForm(): void {
    this.createProjectMeetingForm.reset();
  }

  private validateForm(): boolean {
    return (
      !!this.createProjectMeetingForm.get('date')?.value &&
      !!this.createProjectMeetingForm.get('projects')?.value &&
      this.createProjectMeetingForm.get('startTime')?.value &&
      this.createProjectMeetingForm.get('duration')?.value
    );
  }

  public navigateConfirm() {
    this.router.navigate(['/meet/create/confirm']);
  }

  public navigateBack() {
    this.router.navigate(['/meet/create/start']);
  }
}
