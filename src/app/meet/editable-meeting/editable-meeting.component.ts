import { Component, Input, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { DisplayedMeeting, EMPTY_MEETING, Meeting } from '../models/common';

@Component({
  selector: 'app-editable-meeting',
  templateUrl: './editable-meeting.component.html',
  styleUrls: ['./editable-meeting.component.scss']
})
export class EditableMeetingComponent implements OnInit {

  @Input() meetingData: DisplayedMeeting = JSON.parse(JSON.stringify(EMPTY_MEETING));

  // meetingStartTime: string | number = '';
  // header: string = '';

  constructor() { }

  ngOnInit(): void {
    // const meetingTime = DateTime.fromISO(this.meetingData.startDate);

    // this.meetingStartTime = meetingTime.toFormat('h:mm a');

    // this.header = `${this.meetingStartTime} ${this.meetingData.name}`;
  }

}
