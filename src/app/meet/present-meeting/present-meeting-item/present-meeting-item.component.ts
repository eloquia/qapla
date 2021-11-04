import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ProfileService } from 'src/app/profile.service';
import { MeetingActionTypes } from 'src/app/stores/meeting/actions';
import { IMeetingState } from 'src/app/stores/meeting/state';
import { MeetingItem, MeetingNote } from '../../models/common';
import { UpdateMeetingItemRequest } from '../../models/requests';

@Component({
  selector: 'app-present-meeting-item',
  templateUrl: './present-meeting-item.component.html',
  styleUrls: ['./present-meeting-item.component.scss'],
})
export class PresentMeetingItemComponent implements OnInit, OnDestroy {
  plannedAttendanceOptions = [ 'Attending', 'Leave Early', 'Join Late', 'Not Attending' ]
  actualAttendanceOptions = [ 'Attending', 'Leave Early', 'Join Late', 'Not Attending', 'No Show' ];

  isVisible: boolean = true;

  @Input()
  showProjectName: boolean = false;

  @Input()
  meetingItem: MeetingItem | null = null;
  notes: MeetingNote[] = [];

  @ViewChild('tagInput')
  tagInput!: ElementRef<HTMLInputElement>;

  meetingItemForm = this.formBuilder.group({
    plannedAttendance: ['Attending'],
    actualAttendance: ['Attending'],
    attendanceReason: [''],
  })

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private store: Store<IMeetingState>,
  ) {}

  ngOnInit(): void {
    this.meetingItemForm.get('attendanceReason')?.setValue(this.meetingItem?.attendanceReason)
    this.meetingItemForm.get('plannedAttendance')?.setValue(this.meetingItem?.plannedAttendanceStatus)
    this.meetingItemForm.get('actualAttendance')?.setValue(this.meetingItem?.actualAttendanceStatus)
    this.notes = this.meetingItem!.notes ? this.meetingItem!.notes : [];
  }

  ngOnDestroy(): void {
    this.saveMeetingDetails();
  }

  saveMeetingDetails(): void {
    console.log('save meeting details');

    // update meeting
    const updateRequest: UpdateMeetingItemRequest = {
      id: `${this.meetingItem!.id}`,
      personnelID: `${this.meetingItem!.personnel.id}`,
      plannedAttendanceStatus: this.meetingItemForm.get('plannedAttendance')!.value,
      actualAttendanceStatus: this.meetingItemForm.get('actualAttendance')!.value,
      attendanceReason: this.meetingItemForm.get('attendanceReason')!.value,
      notes: this.notes,
    };
    console.log('saveMeetingRequest', updateRequest);
    // this.meetingService.updateMeeting(updateRequest);
    this.store.dispatch({ type: MeetingActionTypes.UPDATE_MEETING_ITEM, payload: updateRequest })
  }

  /**
   * Removes a note from the list of notes
   * @param noteIdx
   */
  public removeNoteByIndex(noteIdx: number): void {
    const clones = this.notes
    clones.splice(noteIdx, 1)
    this.notes = clones;
  }

  public addNote(): void {
    // if no notes, add a note
    if (!this.notes) {
      this.notes = [
        {
          text: '',
          authorId: this.profileService.getUserId(),
          aboutId: this.meetingItem!.personnel.id!,
          tags: []
        }
      ]

      return;
    }

    // if at least one note is empty, do nothing; else add an empty note
    const numEmpty = this.notes?.filter(note => note.text === '').length;
    if (numEmpty === 0) {
      const emptyNote: MeetingNote = {
        text: '',
        authorId: this.profileService.getUserId(),
        aboutId: this.meetingItem!.personnel.id!,
        tags: [],
      }
      this.notes = [...this.notes, emptyNote];
    }
  }

  public handleSearchEvent($event: any): void {
    console.log('handleSearchEvent', $event);
  }

  public handleSelectEvent($event: any): void {
    console.log('handleSelectEvent', $event);
  }

  handleOptionClick($event: any) {
    console.log('handleOptionClick($event)', $event)
  }

  handleTagChange($event: any) {
    console.log('handleTagChange($event)', $event.value)
    const tags = $event.value;
  }

  /*
    Other actions
  */
  public toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

}
