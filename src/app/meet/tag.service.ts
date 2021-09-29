import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MeetingNoteTag } from './models/common';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private tagsSubject_: Subject<MeetingNoteTag[]> = new Subject<MeetingNoteTag[]>();
  public tags$: Observable<MeetingNoteTag[]> = this.tagsSubject_.asObservable();

  constructor() {
    this.tagsSubject_.next([
      {
        id: -993,
        text: 'Dagney Taggert',
      },
      {
        id: -996,
        text: 'Guten Tag',
      },
      {
        id: -997,
        text: 'Mock Tag 1',
      },
      {
        id: -994,
        text: 'Mock Tag 2',
      },
      {
        id: -995,
        text: 'Play Tag',
      },
    ])
  }
}
