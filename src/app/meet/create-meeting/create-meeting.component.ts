import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Personnel } from 'src/app/personnel/models';

import { PersonnelService } from 'src/app/personnel/personnel.service';
import { Project } from 'src/app/project/models';
import { ProjectService } from 'src/app/project/project.service';

import { MeetService } from '../meet.service';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.scss']
})
export class CreateMeetingComponent implements OnInit {

  meetingFrequencies = [
    {
      id: 1,
      displayValue: 'Once',
    },
    {
      id: 2,
      displayValue: 'Daily',
    },
    {
      id: 3,
      displayValue: 'Weekly',
    },
    {
      id: 4,
      displayValue: 'Monthly',
    },
  ];

  meetingForm = this.formBuilder.group({
    name: [''],
    description: [''],
    date: [''],
    startTime: [''],
    endTime: [''],
    duration: [''],
    scheduleFrequency: [''],
    once: [''],
    projects: [''],
    personnel: [''],
  });

  projects: Observable<Project[]> = this.projectService.projects$;
  personnels: Observable<Personnel[]> = this.personnelService.personnel$;

  constructor(
    private formBuilder: FormBuilder,
    private meetingService: MeetService,
    private personnelService: PersonnelService,
    private projectService: ProjectService,
  ) {
    this.meetingForm.get('scheduleFrequency')?.patchValue(this.meetingFrequencies[0].id)
  }

  ngOnInit(): void {
    // this.projects = this.personnelService.getAllPersonnel();
  }

  public createMeeting(): void {
    console.log('Submit create meeting!', this.meetingForm);
  }

  public resetForm(): void {
    console.log('Clearing form');
    this.meetingForm.reset();
    this.meetingForm.get('scheduleFrequency')?.patchValue(this.meetingFrequencies[0].id)
  }

}
