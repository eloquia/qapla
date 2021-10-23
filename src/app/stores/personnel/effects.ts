import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CreatePersonnelRequest } from 'src/app/personnel/models';
import { PersonnelService } from 'src/app/personnel/personnel.service';
import { PersonnelActionTypes } from './actions';

/*
  Effects provide a way to perform side effects
*/

@Injectable({
  providedIn: 'root'
})
export class PersonnelEffects {

  loadPersonnel$ = createEffect(() => this.actions$.pipe(
    ofType(PersonnelActionTypes.GET_PERSONNEL_LIST),
    switchMap(() => this.personnelService.getUsers()
      .pipe(
        map(p => {
          return ({ type: PersonnelActionTypes.GET_PERSONNEL_LIST_SUCCESS, payload: p })
        }),
        catchError(() => of({ type: '[Personnel API] Personnel Loaded Error' }))
      )
    ),
  ));

  createPersonnel$ = createEffect(() => this.actions$.pipe(
    ofType(PersonnelActionTypes.CREATE_PERSONNEL),
    switchMap((createPersonnelRequest: CreatePersonnelRequest) => this.personnelService.createPersonnel(createPersonnelRequest)
      .pipe(
        map(r => ({ type: '[Personnel API] Create Personnel Success' })),
        catchError(() => of({ type: '[Personnel API] Create Personnel Error' }))
      )
    )
  ));

  deletePersonnel$ = createEffect(() => this.actions$.pipe(
    ofType(PersonnelActionTypes.DELETE_PERSONNEL),
    switchMap((id: number) => this.personnelService.deletePersonnel({id})
      .pipe(
        map(r => ({ type: '[Personnel API] Delete Personnel Success' })),
        catchError(() => of({ type: '[Personnel API] Delete Personnel Error' }))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private personnelService: PersonnelService,
  ) {}

}
