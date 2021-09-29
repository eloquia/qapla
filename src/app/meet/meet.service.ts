import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { SuccessToastConfig, WarningToastConfig } from '../core/models';
import { ProfileService } from '../profile.service';
import { Meeting, MeetingNote, MeetingViewType, MOCK_MEETING_1, SearchResult } from './models/common';
import {
  CreateMeetingRequest,
  UpdateMeetingNoteRequest,
  UpdateMeetingRequest,
} from './models/requests';
import {
  UpdateMeetingNoteResponse,
  UpdateMeetingResponse,
} from './models/responses';

@Injectable({
  providedIn: 'root',
})
export class MeetService {
  // -------------------- Data ----------------------

  private meetingsSubject_: Subject<Meeting[]> = new Subject<Meeting[]>();
  public meetings$: Observable<Meeting[]> =
    this.meetingsSubject_.asObservable();

  private tagSearchResultsSubject_: Subject<SearchResult[]> = new BehaviorSubject<SearchResult[]>([
    {
      id: 1,
      text: 'good',
    },
    {
      id: 2,
      text: 'bad',
    },
    {
      id: 3,
      text: 'question',
    },
  ]);
  public tagSearchResults$: Observable<SearchResult[]> =
    this.tagSearchResultsSubject_.asObservable();

  // -------------------- Events ----------------------

  private createMeetingEventSubject_: Subject<CreateMeetingRequest> =
    new Subject<CreateMeetingRequest>();
  public createMeeting$: Observable<CreateMeetingRequest> =
    this.createMeetingEventSubject_.asObservable();
  private createMeetingSub = this.createMeetingEventSubject_
    .asObservable()
    .pipe(
      switchMap((createMeetingRequest) => {
        return this.httpClient.post<Meeting>(
          'http://localhost:8080/meeting',
          createMeetingRequest
        );
      })
    )
    .subscribe({
      next: (v) => {
        this.toasterService.success(
          `Meeting Scheduled`,
          `Success`,
          SuccessToastConfig
        );
        this.successCreateFormEventSubject_.next(null);
      },
      error: (e) => {
        console.warn('Error scheduling meeting', e);
        this.toasterService.warning(
          `Something went wrong: ${e.status} ${e.statusText}`,
          `Error`,
          WarningToastConfig
        );
      },
    });

  private successCreateFormEventSubject_: Subject<any> = new Subject<any>();
  public successCreateFormEvent$: Observable<any> =
    this.successCreateFormEventSubject_.asObservable();

  private fetchMeetingsEventSubject_: Subject<string> = new Subject<string>();
  private fetchMeetingsSub = this.fetchMeetingsEventSubject_
    .asObservable()
    .pipe(
      switchMap((date) => {
        const dateParts: string[] = date.split('-');
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
        const tz = DateTime.local().toFormat('z');
        return this.httpClient.get<Meeting[]>(
          `http://localhost:8080/meeting?year=${year}&month=${month}&day=${day}&zone=${tz}`
        ).pipe(
          map(meetings => {
            // convert incoming "notes: null" into an array, which might be wrong here...
            return meetings ? meetings.map(meeting => {

              if (meeting.meetingItems) {

                meeting.meetingItems.map(meetingItem => {

                  if (!meetingItem.notes) {
                    console.log('adding notes to', meetingItem)

                    meetingItem.notes = [{
                      text: '',
                      authorId: this.profileService.getUserId(),
                      aboutId: meetingItem.personnel.id,
                      meetingNoteTag: {
                        text: '',
                      }
                    }];

                  } else {
                    // there are meeting notes, so we should filter by
                    // current author and other author
                    const notes: MeetingNote[] = meetingItem.notes.filter((note: MeetingNote) => {
                      return note.authorId === this.profileService.getUserId();
                    })
                    const othersNotes: MeetingNote[] = meetingItem.notes.filter((notes: MeetingNote) => {
                      return notes.authorId !== this.profileService.getUserId();
                    })

                    meetingItem.othersNotes = othersNotes;
                    meetingItem.notes = notes;
                  }

                  return meetingItem;
                });

              } else {
                // there are no meeting items
                console.log('no meeting items?', meeting.meetingItems)
              }

              return meeting;
            })
            : meetings;
          })
        );
      }),
      tap((meetings) => {
        console.log('meetings fetched', meetings);
        this.meetingsSubject_.next(meetings);
      })
    )
    .subscribe({
      next: r => console.log('r', r),
      error: e => {
        console.warn('e', e)
        this.meetingsSubject_.next([MOCK_MEETING_1]);
      }
    });

  // -------------------- Calendar ----------------------

  private dateSubject_: Subject<DateTime> = new BehaviorSubject<DateTime>(DateTime.now());
  public date$: Observable<DateTime> = this.dateSubject_.asObservable()
    .pipe(
      tap(date => {
        const urlDisplayed = date.toFormat('yyyy-MM-dd');
        // this.router.navigate([`/meet/${urlDisplayed}`]);
        this.fetchMeetingsEventSubject_.next(urlDisplayed)
      })
    );

  // Search event
  private tagSearchEventSubject_: Subject<string> = new Subject();
  tagSearchEventSub$: Subscription = this.tagSearchEventSubject_
    .asObservable()
    .pipe(
      switchMap((tagText) =>
        this.httpClient.get<SearchResult>(
          `http://localhost:8080/meeting_note_tag?text=${tagText}`
        )
      )
    )
    .subscribe({
      next: (request) => {},
      error: (e) => {
        console.warn('Error searching for tags:', e);
      },
    });

  // ---------- Update Meeting Note Event ----------

  private updateMeetingNoteEventSubject_: Subject<UpdateMeetingNoteRequest> =
    new Subject();
  updateMeetingNoteSub$: Subscription = this.updateMeetingNoteEventSubject_
    .asObservable()
    .pipe(
      mergeMap((updateRequest) => {
        return this.httpClient.put<UpdateMeetingNoteResponse>(
          `http://localhost:8080/meeting_note/${updateRequest.id}`,
          updateRequest
        );
      })
    )
    .subscribe({
      next: (request) => {},
      error: (e) => {
        console.warn('Error updating meeting note:', e);
      },
    });

  private updateMeetingEventSubject_: Subject<UpdateMeetingRequest> =
    new Subject();
  updateMeetingEventSub$: Subscription = this.updateMeetingEventSubject_
    .asObservable()
    .pipe(
      mergeMap((updateRequest) => {
        return this.httpClient.put<UpdateMeetingResponse>(
          `http://localhost:8080/meeting/${updateRequest.id}`,
          updateRequest
        );
      })
    )
    .subscribe({
      next: () => {
        this.toasterService.success(
          `Meeting Saved`,
          `Success`,
          SuccessToastConfig
        );
      },
      error: (e) => {
        console.warn('Error updating meeting', e)
        this.toasterService.warning(
          `Something went wrong: ${e.status} ${e.statusText}`,
          `Error`,
          WarningToastConfig
        );
      },
    });

  // -------------------- Constructors ----------------------

  constructor(
    private httpClient: HttpClient,
    private toasterService: ToastrService,
    private profileService: ProfileService,
    private router: Router,
  ) {}

  // -------------------- Functions ----------------------

  public setMeetings(meetings: Meeting[]): void {
    this.meetingsSubject_.next(meetings);
  }

  public getMeetingsByDate(date: string): Observable<Meeting[]> {
    this.fetchMeetingsEventSubject_.next(date);

    const dateParts: string[] = date.split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    const tz = DateTime.local().toFormat('z');
    return this.httpClient.get<Meeting[]>(
      `http://localhost:8080/meeting?year=${year}&month=${month}&day=${day}&zone=${tz}`
    ).pipe(
      map(meetings => {
        // convert incoming "notes: null" into an array, which might be wrong here...
        return meetings ? meetings.map(meeting => {

          if (meeting.meetingItems) {

            meeting.meetingItems.map(meetingItem => {

              if (!meetingItem.notes) {
                console.log('adding notes to', meetingItem)

                meetingItem.notes = [{
                  text: '',
                  authorId: this.profileService.getUserId(),
                  aboutId: meetingItem.personnel.id,
                  meetingNoteTag: {
                    text: '',
                  }
                }];

              } else {
                // there are meeting notes, so we should filter by
                // current author and other author
                const notes: MeetingNote[] = meetingItem.notes.filter((note: MeetingNote) => {
                  return note.authorId === this.profileService.getUserId();
                })
                const othersNotes: MeetingNote[] = meetingItem.notes.filter((notes: MeetingNote) => {
                  return notes.authorId !== this.profileService.getUserId();
                })

                meetingItem.othersNotes = othersNotes;
                meetingItem.notes = notes;
              }

              return meetingItem;
            });

          } else {
            // there are no meeting items
            console.log('no meeting items?', meeting.meetingItems)
          }

          return meeting;
        })
        : meetings;
      })
    );
  }

  public createMeeting(meetingDetails: CreateMeetingRequest): void {
    this.createMeetingEventSubject_.next(meetingDetails);
  }

  public updateMeetingNote(updateRequest: UpdateMeetingNoteRequest): void {
    this.updateMeetingNoteEventSubject_.next(updateRequest);
  }

  public updateMeeting(updateRequest: UpdateMeetingRequest): void {
    this.updateMeetingEventSubject_.next(updateRequest);
  }

  // ---------- Search for Tags ----------
  public searchTag(tagText: string): void {
    console.log('searching for', tagText);
  }

  updateDate(dateTime: DateTime): void {
    this.dateSubject_.next(dateTime);
  }
}
