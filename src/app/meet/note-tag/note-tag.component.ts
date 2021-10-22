import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MeetingNote, MeetingNoteTag } from '../models/common';
import { map, startWith, switchMap } from 'rxjs/operators';
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
  };

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags$: Observable<MeetingNoteTag[]>;
  tagCtrl = new FormControl();
  tags$: Observable<MeetingNoteTag[]> = this.store.select(selectTags);
  public selectedTags: string[] = [];

  /* ---------- Search Bar ---------- */
  showSearchResults: boolean = false;
  searchInput: string = '';

  constructor(
    private store: Store<IMeetingState>,
  ) {
    this.filteredTags$ = this.tagCtrl.valueChanges.pipe(
      startWith(''),
      switchMap(searchString => this.tags$.pipe(
        map(tags => tags.filter(t => t.text.includes(searchString)))
      ))
    );
  }

  ngOnInit(): void {
  }

  /* ---------- Note Tag Search stuff ---------- */
  public showResults(): void {
    this.showSearchResults = true;
  }

  public hideResults(): void {
    this.showSearchResults = false;
  }

  public fetchResults(searchCandidate: string): void {
    this.store.dispatch({ type: '[Meeting API] Search Tag By Text', payload: searchCandidate })
  }

  public removeTag(tagIdx: number) {
    console.log(`removeTag - tagIdx: ${tagIdx}`)
    this.note.tags = this.note.tags!.splice(tagIdx, 1);
  }

  addTag(event: MatChipInputEvent): void {
    console.log('createTag', event)
    /*
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push(value);
      console.log('value', value)
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
    */
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log('selected', event)
  }

}
