import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MeetService } from 'src/app/meet/meet.service';
import { CreateMeetingRequest } from 'src/app/meet/models/requests';
import { CreatePersonnelRequest } from 'src/app/personnel/models';
import { PersonnelService } from 'src/app/personnel/personnel.service';

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
    switchMap((request: LoadMeetingsByDateRequest) => {
    
      return this.meetingService.getMeetingsByDate(request.payload)
      .pipe(
        map(p => {
          return ({ type: '[Meeting API] Retrieved Meetings Success', payload: p })
        }),
        catchError(() => of({ type: '[Personnel API] Personnel Loaded Error' }))
      )
    }),
  ));

  createMeeting$ = createEffect(() => this.actions$.pipe(
    ofType('[Meeting API] Create Meeting'),
    switchMap((createMeetingRequest: CreateMeetingRequest) => this.meetingService.createMeeting(createMeetingRequest)
      .pipe(
        map(r => ({ type: '[Meeting API] Create Meeting Success' })),
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
  ) {}

}
