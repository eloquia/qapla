import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { SuccessToastConfig, WarningToastConfig } from '../core/models';
import { ProfileService } from '../profile.service';
import { MeetingActionTypes } from '../stores/meeting/actions';
import { Meeting, SearchResult } from './models/common';
import {
  CreateMeetingRequest,
  CreatePeopleMeetingData,
  CreatePeopleMeetingRequest,
  CreateProjectMeetingData,
  CreateProjectMeetingRequest,
  UpdateMeetingNoteRequest,
  UpdateMeetingRequest,
} from './models/requests';
import {
  UpdateMeetingNoteResponse,
  UpdateMeetingResponse,
} from './models/responses';

export interface GetMeetingsByDateResponse {
  meetingsByDate: Meeting[];
}

export interface CreateMeetingResponse {
  id: number;
}

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

  // private createMeetingEventSubject_: Subject<CreateMeetingRequest> =
  //   new Subject<CreateMeetingRequest>();
  // public createMeeting$: Observable<CreateMeetingRequest> =
  //   this.createMeetingEventSubject_.asObservable();
  // private createMeetingSub = this.createMeetingEventSubject_
  //   .asObservable()
  //   .pipe(
  //     switchMap((createMeetingRequest) => {
  //       return this.httpClient.post<Meeting>(
  //         'http://localhost:8080/meeting',
  //         createMeetingRequest
  //       );
  //     })
  //   )
  //   .subscribe({
  //     next: (v) => {
  //       this.toasterService.success(
  //         `Meeting Scheduled`,
  //         `Success`,
  //         SuccessToastConfig
  //       );
  //       this.successCreateFormEventSubject_.next(null);
  //     },
  //     error: (e) => {
  //       console.warn('Error scheduling meeting', e);
  //       this.toasterService.warning(
  //         `Something went wrong: ${e.status} ${e.statusText}`,
  //         `Error`,
  //         WarningToastConfig
  //       );
  //     },
  //   });

  private successCreateFormEventSubject_: Subject<any> = new Subject<any>();
  public successCreateFormEvent$: Observable<any> =
    this.successCreateFormEventSubject_.asObservable();

  private fetchMeetingsEventSubject_: Subject<string> = new Subject<string>();

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
    private apollo: Apollo,
  ) {}

  // -------------------- Functions ----------------------

  public setMeetings(meetings: Meeting[]): void {
    this.meetingsSubject_.next(meetings);
  }

  public createPersonMeeting(meetingDetails: CreatePeopleMeetingRequest) {
    const stringify = JSON.stringify(meetingDetails.createPeopleMeetingRequest.personnelIds);
    return this.apollo.mutate<CreateMeetingResponse>({
      mutation: gql`
        mutation createUserMeeting {
          createUserMeeting(input: {
            name: "${meetingDetails.createPeopleMeetingRequest.name}",
            peopleIDs: ${stringify},
            startTime: "${meetingDetails.createPeopleMeetingRequest.startDate}",
            durationMinutes: ${meetingDetails.createPeopleMeetingRequest.durationMinutes}
          }) {
            id
          }
        }
      `
    }).pipe(
      map(a => a.data?.id)
    )
  }

  public createProjectMeeting(meetingDetails: CreateProjectMeetingRequest) {
    const stringify = JSON.stringify(meetingDetails.createProjectMeetingRequest.projectIds);
    return this.apollo.mutate<CreateMeetingResponse>({
      mutation: gql`
        mutation createProjectMeeting {
          createProjectMeeting(input: {
            name: "${meetingDetails.createProjectMeetingRequest.name}",
            projectIDs: ${stringify},
            startTime: "${meetingDetails.createProjectMeetingRequest.startDate}",
            durationMinutes: ${meetingDetails.createProjectMeetingRequest.durationMinutes}
          }) {
            id
          }
        }
      `
    }).pipe(
      map(a => a.data?.id)
    )
  }

  public createMeeting(createMeetingRequest: CreateMeetingRequest) {
    if (!!createMeetingRequest.meetingData.personnelIds && !!createMeetingRequest.meetingData.personnelIds!.length) {
      const cpmr: CreatePeopleMeetingData = {
        name: createMeetingRequest.meetingData.name,
        startDate: createMeetingRequest.meetingData.startDate,
        createdBy: createMeetingRequest.meetingData.createdBy,
        personnelIds: createMeetingRequest.meetingData.personnelIds,
        durationMinutes: createMeetingRequest.meetingData.durationMinutes,
      };
      return this.createPersonMeeting({ type: MeetingActionTypes.CREATE_PERSONNEL_MEETING, createPeopleMeetingRequest: cpmr })
    } else if (!!createMeetingRequest.meetingData.projectIds && !!createMeetingRequest.meetingData.projectIds!.length) {
      const cpmr: CreateProjectMeetingData = {
        name: createMeetingRequest.meetingData.name,
        startDate: createMeetingRequest.meetingData.startDate,
        createdBy: createMeetingRequest.meetingData.createdBy,
        projectIds: createMeetingRequest.meetingData.projectIds,
        durationMinutes: createMeetingRequest.meetingData.durationMinutes,
      }
      return this.createProjectMeeting({ type: MeetingActionTypes.CREATE_PROJECT_MEETING, createProjectMeetingRequest: cpmr })
    } else {
      throw new Error('Unknown meeting type')
    }
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

  public getMeetingsByDate(date: string): Observable<Meeting[]> {
    return this.apollo.query<GetMeetingsByDateResponse>({
      query: gql`
        query getMeetingsByDate {
          meetingsByDate(date: "${date}") {
            id
            name
            startTime
            durationMinutes
            people {
              id
              firstName
              lastName
            }
            projects {
              id
              name
            }
            meetingItems {
              id
              personnel {
                id
                firstName
                lastName
              }
              plannedAttendanceStatus
              actualAttendanceStatus
              attendanceReason
              notes {
                id
                about {
                  id
                  firstName
                  lastName
                }
                author {
                  id
                  firstName
                  lastName
                }
                text
                tags {
                  id
                  text
                }
              }
            }
          }
        }
      `
    }).pipe(
      map(a => {
        return a.data!.meetingsByDate
      }),
      catchError(() => of([]))
    )
  }
}
