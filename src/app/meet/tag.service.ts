import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MeetingNote, MeetingNoteTag } from './models/common';

interface GetTagsResponse {
  tags: MeetingNoteTag[];
}

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private tagsSubject_: Subject<MeetingNoteTag[]> = new Subject<MeetingNoteTag[]>();
  public tags$: Observable<MeetingNoteTag[]> = this.tagsSubject_.asObservable();

  constructor(
    private apollo: Apollo,
  ) {
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

  getTags(): Observable<MeetingNoteTag[]> {
    return this.apollo.query<GetTagsResponse>({
      query: gql`
        query getTags {
          tags {
            id
            text
          }
        }
      `
    }).pipe(
      map(a => {
        return a.data!.tags
      }),
      catchError(() => of([]))
    )
  }
}
