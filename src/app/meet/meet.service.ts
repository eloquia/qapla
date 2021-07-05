import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { mergeMap, switchMap, tap } from 'rxjs/operators';
import { SuccessToastConfig, WarningToastConfig } from '../core/models';

import { CreateMeetingRequest, Meeting, MeetingViewType, UpdateMeetingNoteRequest, UpdateMeetingNoteResponse } from './models';

@Injectable({
  providedIn: 'root',
})
export class MeetService {

  // -------------------- Data ----------------------

  private meetingsSubject_: Subject<Meeting[]> = new Subject<Meeting[]>();
  public meetings$: Observable<Meeting[]> = this.meetingsSubject_.asObservable();

  private dateTypeSubject_: Subject<MeetingViewType> = new BehaviorSubject<MeetingViewType>(MeetingViewType.PRESENT);
  public dateType$: Observable<MeetingViewType> = this.dateTypeSubject_.asObservable();

  // -------------------- Events ----------------------

  private createMeetingEventSubject_: Subject<CreateMeetingRequest> = new Subject<CreateMeetingRequest>();
  public createMeeting$: Observable<CreateMeetingRequest> = this.createMeetingEventSubject_.asObservable();
  private createMeetingSub = this.createMeetingEventSubject_.asObservable().pipe(
    switchMap(createMeetingRequest => {
      return this.httpClient.post<Meeting>('http://localhost:8080/meeting', createMeetingRequest);
    })
  ).subscribe({
    next: (v) => {
      this.toasterService.success(
        `Meeting Scheduled`,
        `Success`,
        SuccessToastConfig,
      );
      this.successCreateFormEventSubject_.next(null);
    },
    error: (e) => {
      console.warn('Error scheduling meeting', e)
      this.toasterService.warning(
        `Something went wrong: ${e.status} ${e.statusText}`,
        `Error`,
        WarningToastConfig,
      )
    },
  });

  private successCreateFormEventSubject_: Subject<any> = new Subject<any>();
  public successCreateFormEvent$: Observable<any> = this.successCreateFormEventSubject_.asObservable();

  private fetchMeetingsEventSubject_: Subject<string> = new Subject<string>();
  private fetchMeetingsSub = this.fetchMeetingsEventSubject_.asObservable().pipe(
    switchMap(date => {
      const dateParts: string[] = date.split('-');
      const year = dateParts[0];
      const month = dateParts[1];
      const day = dateParts[2];
      return this.httpClient.get<Meeting[]>(`http://localhost:8080/meeting?year=${year}&month=${month}&day=${day}`);
    }),
    tap(meetings => {
      console.log('meetings fetched', meetings)
      this.meetingsSubject_.next(meetings);
    })
  ).subscribe();

  // ---------- Update Meeting Note Event ----------

  private updateMeetingNoteEventSubject_: Subject<UpdateMeetingNoteRequest> = new Subject();
  updateMeetingNoteSub$: Subscription = this.updateMeetingNoteEventSubject_
    .asObservable()
    .pipe(
      mergeMap(updateRequest => {
        return this.httpClient.put<UpdateMeetingNoteResponse>(`http://localhost:8080/meeting_note/${updateRequest.id}`, updateRequest)
      })
    )
    .subscribe({
      next: (request) => {

      },
      error: (e) => {
        console.warn('Error updating meeting note:', e)
      },
    })

  // -------------------- Constructors ----------------------

  constructor(
    private httpClient: HttpClient,
    private toasterService: ToastrService,
  ) { }

  // -------------------- Functions ----------------------

  public setMeetings(meetings: Meeting[]): void {
    this.meetingsSubject_.next(meetings);
  }

  public getMeetingsByDate(date: string): void {
    this.fetchMeetingsEventSubject_.next(date);
    // return this.httpClient.get<Meeting[]>(`http://localhost:8080/meeting/${date}`);
  }

  public createMeeting(meetingDetails: CreateMeetingRequest): void {
    this.createMeetingEventSubject_.next(meetingDetails);
  }

  public updateMeetingNote(updateRequest: UpdateMeetingNoteRequest): void {
    this.updateMeetingNoteEventSubject_.next(updateRequest);
  }
}
