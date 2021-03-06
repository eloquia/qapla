import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DateTime } from 'luxon';
import { ProfileService } from 'src/app/profile.service';
import { MeetingActionTypes } from 'src/app/stores/meeting/actions';
import { IMeetingState } from 'src/app/stores/meeting/state';
import { MeetService } from '../meet.service';
import { Meeting } from '../models/common';
import { UpdateMeetingRequest } from '../models/requests';

@Component({
  selector: 'app-present-meeting',
  templateUrl: './present-meeting.component.html',
  styleUrls: ['./present-meeting.component.scss'],
})
export class PresentMeetingComponent implements OnInit, OnDestroy {
  presentMeetingForm = this.formBuilder.group({});

  isMouseIn: boolean = false;

  @Input() meeting: Meeting = {
    id: 0,
    name: '',
    startTime: DateTime.now().toISO(),
  };
  meetingStartTime: string = '';

  showDetail: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private meetingService: MeetService,
    private profileService: ProfileService,
    private store: Store<IMeetingState>,
  ) {}

  ngOnInit(): void {
    const meetingTime = DateTime.fromISO(this.meeting.startTime);

    this.meetingStartTime = meetingTime.toFormat('h:mm a');
  }

  ngOnDestroy(): void {
    this.saveMeeting();
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

  /*
    Event handler for detecting when the "save" hotkeys are pressed
  */

  onKeyDown($event: any): void {
    // Detect platform
    if(navigator.platform.match('Mac')){
        this.handleMacKeyEvents($event);
    }
    else {
        this.handleWindowsKeyEvents($event); 
    }
  }

  handleMacKeyEvents($event: any) {
    // MetaKey documentation
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey
    let charCode = String.fromCharCode($event.which).toLowerCase();
    if ($event.metaKey && charCode === 's') {
        // Action on Cmd + S
        $event.preventDefault();
        this.saveMeeting();
    } 
  }

  handleWindowsKeyEvents($event: any) {
    let charCode = String.fromCharCode($event.which).toLowerCase();
    if ($event.ctrlKey && charCode === 's') {
        // Action on Ctrl + S
        $event.preventDefault();
        this.saveMeeting();
    } 
  }

  saveMeeting(): void {
    const durationMinutes = DateTime.fromISO(this.meeting.startDate!)
      .diff(DateTime.fromISO(this.meeting.endDate!), 'minutes')
      .minutes
    // update meeting
    const updateRequest: UpdateMeetingRequest = {
      id: this.meeting.id,
      name: this.meeting.name,
      startTime: this.meeting.startDate!,
      durationMinutes,
      meetingItems: this.meeting.meetingItems,
        // ? this.meeting.meetingItems?.map((meetingItem: MeetingItem) => {
        //   const displayedMeetingItem: MeetingItem = {

        //     notes: meetingItem.notes?.map((note: MeetingNote) => {
        //       return {
        //         ...note,
        //         authorId: this.profileService.getUserId(),
        //       }
        //     })
        //   }
        //   return {
        //     ...meetingItem,
            
        //   };
        // })
        // : [],
    };
    console.log('saveMeetingRequest', updateRequest);
    // this.meetingService.updateMeeting(updateRequest);
    this.store.dispatch({ type: MeetingActionTypes.UPDATE_MEETING, payload: updateRequest })
  }
}
