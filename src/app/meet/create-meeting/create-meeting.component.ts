import { Component, OnInit } from '@angular/core';

import { PersonnelService } from 'src/app/personnel/personnel.service';
import { ProjectService } from 'src/app/project/project.service';

import { MeetService } from '../meet.service';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.scss']
})
export class CreateMeetingComponent implements OnInit {

  constructor(
    private meetingService: MeetService,
    private personnelService: PersonnelService,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
  }

  public createMeeting(): void {

  }

}
