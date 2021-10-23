import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';

import { MeetingNote, MeetingNoteTag } from '../models/common';
import { IMeetingState } from 'src/app/stores/meeting/state';
import { selectTags } from 'src/app/stores/meeting/selectors';

@Component({
  selector: 'app-note-tag',
  templateUrl: './note-tag.component.html',
  styleUrls: ['./note-tag.component.scss']
})
export class NoteTagComponent implements OnInit {

  @Input() note: MeetingNote = {
    text: '',
    authorId: 0,
    aboutId: 0,
    tags: [],
  };

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags$: Observable<string[]>;
  tagCtrl = new FormControl();
  tags$: Observable<MeetingNoteTag[]> = this.store.select(selectTags);
  public selectedTags: string[] = [];

  constructor(
    private store: Store<IMeetingState>,
  ) {
    this.filteredTags$ = combineLatest([this.tags$, this.tagCtrl.valueChanges])
      .pipe(
        map((combined) => {
          const tags = combined[0]
          const searchString = combined[1]
          if (!searchString) {
            return tags.map(t => t.text);
          }
          return !!tags ? tags.filter(tag => tag.text.toLowerCase().includes(searchString.toLowerCase())).map(t => t.text) : [];
        })
      );
  }

  ngOnInit(): void {}

  public fetchResults(searchCandidate: string): void {
    console.log('fetchResults', searchCandidate)
  }

  public removeTag(tagIdx: number) {
    console.log(`removeTag - tagIdx: ${tagIdx}`)
    this.note.tags = this.note.tags!.splice(tagIdx, 1);
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.store.dispatch({ type: '[Meeting API] Create Tag', payload: value })
      this.note.tags = [ ...this.note.tags, { text: value} ];
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log('selected', event)
  }

}
