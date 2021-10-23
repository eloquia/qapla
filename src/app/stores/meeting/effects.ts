import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MeetService } from 'src/app/meet/meet.service';
import { CreatePeopleMeetingRequest, CreateProjectMeetingRequest } from 'src/app/meet/models/requests';
import { TagService } from 'src/app/meet/tag.service';
import { MeetingActionTypes, TagActionTypes } from './actions';

interface LoadMeetingsByDateRequest {
  type: string;
  payload: any;
}

interface FetchTagsRequest {
  type: string;
  payload: any;
}

/*
  Effects provide a way to perform side effects
*/

@Injectable({
  providedIn: 'root'
})
export class MeetingEffects {

  loadMeetingsByDate$ = createEffect(() => this.actions$.pipe(
    ofType(MeetingActionTypes.GET_MEETINGS_BY_DATE),
    switchMap((request: LoadMeetingsByDateRequest) => this.meetingService.getMeetingsByDate(request.payload)
      .pipe(
        map(p => {
          return ({ type: MeetingActionTypes.RETRIEVED_MEETINGS_SUCCESS, payload: p })
        }),
        catchError(() => of({ type: '[Personnel API] Personnel Loaded Error' }))
      )
    ),
  ));

  fetchTags$ = createEffect(() => this.actions$.pipe(
    ofType(TagActionTypes.GET_TAG_LIST),
    switchMap(() => this.tagService.getTags()
      .pipe(
        map(ts => {
          return ({ type: TagActionTypes.GET_TAG_LIST_SUCCESS, payload: ts })
        }),
        catchError(() => of({ type: '[Meeting API] Tag List Fetch Error' }))
      )
    )
  ))

  createPeopleMeeting$ = createEffect(() => this.actions$.pipe(
    ofType(MeetingActionTypes.CREATE_PERSONNEL_MEETING),
    switchMap((createPeopleMeetingRequest: CreatePeopleMeetingRequest) => this.meetingService.createPersonMeeting(createPeopleMeetingRequest)
      .pipe(
        map(r => {
          this.matDialog.closeAll();
          this.toasterService.success('Successfully scheduled meeting')
          return ({ type: '[Meeting API] Create Meeting Success' })
        }),
        catchError(() => of({ type: '[Meeting API] Create Meeting Error' }))
      )
    )
  ));

  createProjectMeeting$ = createEffect(() => this.actions$.pipe(
    ofType(MeetingActionTypes.CREATE_PROJECT_MEETING),
    switchMap((createProjectMeetingRequest: CreateProjectMeetingRequest) => this.meetingService.createProjectMeeting(createProjectMeetingRequest)
      .pipe(
        map(r => {
          this.matDialog.closeAll();
          this.toasterService.success('Successfully scheduled meeting')
          return ({ type: '[Meeting API] Create Meeting Success' })
        }),
        catchError(() => of({ type: '[Meeting API] Create Meeting Error' }))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private meetingService: MeetService,
    private matDialog: MatDialog,
    private toasterService: ToastrService,
    private tagService: TagService,
  ) {}

}
