import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileService } from 'src/app/profile.service';
import { MeetService } from '../../meet.service';
import {
  EMPTY_MEETING_NOTE,
  EMPTY_PRESENT_MEETING_ITEM,
  MOCK_MEETING_NOTE_COLLECTION_3,
  OtherMeetingNote,
  PresentMeetingItem,
  SearchResult,
} from '../../models/common';

@Component({
  selector: 'app-present-meeting-item',
  templateUrl: './present-meeting-item.component.html',
  styleUrls: ['./present-meeting-item.component.scss'],
})
export class PresentMeetingItemComponent implements OnInit {
  plannedAttendanceOptions = [
    'Attending',
    'Leave Early',
    'Join Late',
    'Not Attending',
  ];
  selectedPlannedAttendance = this.plannedAttendanceOptions[0];
  actualAttendanceOptions = [
    'Attending',
    'Leave Early',
    'Join Late',
    'Not Attending',
    'No Show',
  ];
  selectedActualAttendance = this.actualAttendanceOptions[0];

  isInputOpen: boolean = false;

  @Input()
  showProjectName: boolean = false;

  @Input()
  meetingItem: PresentMeetingItem = EMPTY_PRESENT_MEETING_ITEM;

  /* ---------- Search Bar ---------- */
  showSearchResults: boolean = false;
  searchInput: string = '';
  searchResults: Observable<SearchResult[]> =
    this.meetingService.tagSearchResults$;

  constructor(
    private meetingService: MeetService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    console.log('this.meetingItem', this.meetingItem);
  }

  public removeNoteByIndex(note: any): void {
    console.log('removeNoteByIndex', note);
  }

  public addNoteFormControl(): void {
    // if there are no notes, add one
    if (!this.meetingItem.notes) {
      this.meetingItem.notes = [];
    }
    if (!this.meetingItem.notes.length) {
      this.meetingItem.notes = [
        {
          text: '',
          authorId: this.profileService.getUserId(),
          aboutId: this.meetingItem.personnel.id,
          meetingNoteTag: {
            text: '',
          }
        }
      ]
    }
    // check last note to see if it's empty--if it's empty, don't add a note
    if (this.meetingItem.notes && this.meetingItem.notes[this.meetingItem.notes.length - 1].text) {
      // const clone: MeetingNote[] = JSON.parse(JSON.stringify(this.meetingItem.notes));
      // clone.push({
      //   text: '',
      //   authorId: this.profileService.getUserId(),
      //   aboutId: this.meetingItem.personnel.id,
      //   meetingNoteTag: {
      //     text: '',
      //   },
      // });

      // this.meetingItem.notes = clone;
      this.meetingItem.notes.push({
        text: '',
        authorId: this.profileService.getUserId(),
        aboutId: this.meetingItem.personnel.id,
        meetingNoteTag: {
          text: '',
        }
      });
    } else if (!this.meetingItem.notes) {
      this.meetingItem.notes = [EMPTY_MEETING_NOTE]
    }
  }

  public handleSearchEvent($event: any): void {
    console.log('handleSearchEvent', $event);
  }

  public handleSelectEvent($event: any): void {
    console.log('handleSelectEvent', $event);
  }

  /* ---------- Search stuff ---------- */
  public showResults(): void {
    this.showSearchResults = true;
  }

  public hideResults(): void {
    this.showSearchResults = false;
  }

  public fetchResults(searchCandidate: string): void {
    this.meetingService.searchTag(searchCandidate);
  }

  public handleSelect(selected: SearchResult): void {
    console.log('handleSelect selected', selected);
  }
}
