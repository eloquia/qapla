import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DateTime } from 'luxon';

import { EMPTY_PRESENT_MEETING, PresentMeetingView } from '../models';

@Component({
  selector: 'app-present-meeting',
  templateUrl: './present-meeting.component.html',
  styleUrls: ['./present-meeting.component.scss']
})
export class PresentMeetingComponent implements OnInit, OnDestroy {

  presentMeetingForm = this.formBuilder.group({

  });

  isMouseIn: boolean = false;

  @Input() meeting: PresentMeetingView = EMPTY_PRESENT_MEETING;
  meetingStartTime: string = '';

  showDetail: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    const meetingTime = DateTime
      .fromObject({
        hour: parseInt(this.meeting.startHour),
        minute: parseInt(this.meeting.startMinute),
      })

    this.meetingStartTime = meetingTime.toFormat('h:mm a');
  }

  ngOnDestroy(): void {
    console.log('onDestroy!')
  }

  public toggleShowDetail(): void {
    this.showDetail = !this.showDetail;
  }

  public onMouseEnter(): void {
    this.isMouseIn = true;
  }
  public onMouseLeave(): void {
    this.isMouseIn = false;
  }

}
