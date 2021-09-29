import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { Observable } from 'rxjs';
import { ProfileService } from 'src/app/profile.service';
import { MeetService } from '../../meet.service';
import {
  EMPTY_MEETING_NOTE,
  MeetingItem,
} from '../../models/common';
import { TagService } from '../../tag.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-present-meeting-item',
  templateUrl: './present-meeting-item.component.html',
  styleUrls: ['./present-meeting-item.component.scss'],
})
export class PresentMeetingItemComponent implements OnInit {
  plannedAttendanceOptions = [ 'Attending', 'Leave Early', 'Join Late', 'Not Attending' ]
  actualAttendanceOptions = [ 'Attending', 'Leave Early', 'Join Late', 'Not Attending', 'No Show' ];

  @Input()
  showProjectName: boolean = false;

  @Input()
  meetingItem: MeetingItem | null = null;

  /* ---------- Search Bar ---------- */
  showSearchResults: boolean = false;
  searchInput: string = '';

  public selectedTags: string[] = [];

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = ['tag 1', 'tag 2', 'guten tag', 'tag you\'re it', 'tagalog'];

  @ViewChild('tagInput')
  tagInput!: ElementRef<HTMLInputElement>;

  constructor(
    private meetingService: MeetService,
    private profileService: ProfileService,
    private tagService: TagService,
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  ngOnInit(): void {
    console.log('this.meetingItem', this.meetingItem);
  }

  public handlePlannedStatusChange($event: any) {
    console.log('handlePlannedStatusChange', $event)
  }

  public handleActualStatusChange($event: any) {
    console.log('handleActualStatusChange', $event)
  }

  public removeNoteByIndex(note: any): void {
    console.log('removeNoteByIndex', note);
  }

  public addNoteFormControl(): void {
    // if there are no notes, add one
    if (!this.meetingItem!.notes) {
      this.meetingItem!.notes = [];
    }
    if (!this.meetingItem!.notes.length) {
      this.meetingItem!.notes = [
        {
          text: '',
          authorId: this.profileService.getUserId(),
          aboutId: this.meetingItem!.personnel.id,
          meetingNoteTag: {
            text: '',
          }
        }
      ]
    }
    // check last note to see if it's empty--if it's empty, don't add a note
    if (this.meetingItem!.notes && this.meetingItem!.notes[this.meetingItem!.notes.length - 1].text) {
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
      this.meetingItem!.notes.push({
        text: '',
        authorId: this.profileService.getUserId(),
        aboutId: this.meetingItem!.personnel.id,
        meetingNoteTag: {
          text: '',
        }
      });
    } else if (!this.meetingItem!.notes) {
      this.meetingItem!.notes = [EMPTY_MEETING_NOTE]
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

  /* ---------- Note Tag Search stuff ---------- */
  public showResults(): void {
    this.showSearchResults = true;
  }

  public hideResults(): void {
    this.showSearchResults = false;
  }

  public fetchResults(searchCandidate: string): void {
    this.meetingService.searchTag(searchCandidate);
  }

  public removeTag(tag: any) {
    console.log('removeTag', tag)
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push(value);
      console.log('value', value)
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log('selected', event)
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }
}
