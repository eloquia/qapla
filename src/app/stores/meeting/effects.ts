import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { SuccessToastConfig, WarningToastConfig } from 'src/app/core/models';
import { MeetService } from 'src/app/meet/meet.service';
import { CreateMeetingRequest, CreatePeopleMeetingRequest, CreateProjectMeetingRequest, UpdateMeetingItemRequest, UpdateMeetingItemRequestWrapper, UpdateMeetingRequest } from 'src/app/meet/models/requests';
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

  createMeeting$ = createEffect(() => this.actions$.pipe(
    ofType(MeetingActionTypes.CREATE_MEETING),
    switchMap((createMeetingRequest: CreateMeetingRequest) => this.meetingService.createMeeting(createMeetingRequest)
      .pipe(
        map(r => {
          this.matDialog.closeAll();
          this.toasterService.success('Successfully scheduled meeting')
          return ({ type: '[Meeting API] Create Meeting Success' })
        }),
        catchError(() => of({ type: '[Meeting API] Create Meeting Error' }))
      )
    )
  ))

  updateMeeting$ = createEffect(() => this.actions$.pipe(
    ofType(MeetingActionTypes.UPDATE_MEETING),
    mergeMap((updateMeetingRequest: UpdateMeetingRequest) => this.meetingService.updateMeeting(updateMeetingRequest)
      .pipe(
        map(r => ({ type: MeetingActionTypes.GET_MEETINGS_BY_DATE })),
        catchError(() => of({ type: MeetingActionTypes.UPDATE_MEETING_ERROR }))
      )
    )
  ));

  updateMeetingSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(MeetingActionTypes.UPDATE_MEETING_SUCCESS),
      tap((r) => this.toasterService.success(
        `Update Meeting Success`,
        `Success`,
        SuccessToastConfig,
      ))
    ),
    { dispatch: false }
  );

  updateMeetingItem$ = createEffect(
    () => this.actions$.pipe(
      ofType(MeetingActionTypes.UPDATE_MEETING_ITEM),
      mergeMap((updateMeetingItemRequest: UpdateMeetingItemRequestWrapper) => this.meetingService.updateMeetingItem(updateMeetingItemRequest)
        .pipe(
          map(r => ({ type: MeetingActionTypes.UPDATE_MEETING_ITEM_SUCCESS })),
          catchError(() => of({ type: MeetingActionTypes.UPDATE_MEETING_ITEM_ERROR }))
        )
      )
    )
  );

  updateMeetingItemSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(MeetingActionTypes.UPDATE_MEETING_ITEM_SUCCESS),
      tap((r) => this.toasterService.success(
        `Update Meeting Success`,
        `Success`,
        SuccessToastConfig,
      ))
    ),
    { dispatch: false }
  );

  updateMeetingItemError$ = createEffect(
    () => this.actions$.pipe(
      ofType(MeetingActionTypes.UPDATE_MEETING_ITEM_ERROR),
      tap((r) => this.toasterService.warning(
        `Update Meeting Failure: ${r}`,
        `Error`,
        WarningToastConfig,
      ))
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private meetingService: MeetService,
    private matDialog: MatDialog,
    private toasterService: ToastrService,
    private tagService: TagService,
  ) {}

}
