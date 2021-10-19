import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MeetService } from 'src/app/meet/meet.service';
import { CreatePeopleMeetingRequest, CreateProjectMeetingRequest } from 'src/app/meet/models/requests';

interface LoadMeetingsByDateRequest {
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
    ofType('[Meeting API] Get Meetings By Date'),
    switchMap((request: LoadMeetingsByDateRequest) => this.meetingService.getMeetingsByDate(request.payload)
      .pipe(
        map(p => {
          console.log('p', p)
          return ({ type: '[Meeting API] Retrieved Meetings Success', payload: p })
        }),
        catchError(() => of({ type: '[Personnel API] Personnel Loaded Error' }))
      )
    ),
  ));

  createPeopleMeeting$ = createEffect(() => this.actions$.pipe(
    ofType('[Meeting API] Create Personnel Meeting'),
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
    ofType('[Meeting API] Create Project Meeting'),
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

  // deletePersonnel$ = createEffect(() => this.actions$.pipe(
  //   ofType('[Personnel API] Delete Personnel'),
  //   switchMap((id: number) => this.personnelService.deletePersonnel({id})
  //     .pipe(
  //       map(r => ({ type: '[Personnel API] Delete Personnel Success' })),
  //       catchError(() => of({ type: '[Personnel API] Delete Personnel Error' }))
  //     )
  //   )
  // ));

  constructor(
    private actions$: Actions,
    private meetingService: MeetService,
    private matDialog: MatDialog,
    private toasterService: ToastrService,
  ) {}

}
