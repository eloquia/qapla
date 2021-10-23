import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CreateProjectRequest } from 'src/app/project/models';
import { ProjectService } from 'src/app/project/project.service';
import { ProjectActionTypes } from './actions';

/*
  Effects provide a way to perform side effects
*/

@Injectable({
  providedIn: 'root'
})
export class ProjectEffects {

  loadProjects$ = createEffect(() => this.actions$.pipe(
    ofType(ProjectActionTypes.GET_ALL_PROJECT_DETAILS),
    switchMap(() => this.projectService.getAllProjects()
      .pipe(
        map(p => {
          return ({ type: ProjectActionTypes.GET_ALL_PROJECT_DETAILS_SUCCESS, payload: p })
        }),
        catchError(() => of({ type: '[Project API] Project Details List Loaded Error' }))
      )
    ),
  ));

  createProject$ = createEffect(() => this.actions$.pipe(
    ofType(ProjectActionTypes.CREATE_PROJECT),
    switchMap((createProjectRequest: CreateProjectRequest) => this.projectService.createProject(createProjectRequest)
      .pipe(
        map(r => ({ type: '[Project API] Create Project Success' })),
        catchError(() => of({ type: '[Project API] Create Project Error' }))
      )
    )
  ));

  getProjectById$ = createEffect(() => this.actions$.pipe(
    ofType(ProjectActionTypes.GET_PROJECT_BY_ID),
    switchMap((projectSlug: string) => this.projectService.getProjectBySlug(projectSlug)
      .pipe(
        map(r => ({ type: '[Project API] Get Project By ID Success', payload: r })),
        catchError(() => of({ type: '[Project API] Get Project By ID Error' }))
      )
    ),
  ));

  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
  ) {}

}
