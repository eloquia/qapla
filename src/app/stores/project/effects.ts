import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CreateProjectRequest } from 'src/app/project/models';
import { ProjectService } from 'src/app/project/project.service';

/*
  Effects provide a way to perform side effects
*/

@Injectable({
  providedIn: 'root'
})
export class ProjectEffects {

  loadProjects$ = createEffect(() => this.actions$.pipe(
    ofType('[Project API] Get All Project Details'),
    switchMap(() => this.projectService.getAllProjects()
      .pipe(
        map(p => {
          return ({ type: '[Project API] Project Details List Loaded Success', payload: p })
        }),
        catchError(() => of({ type: '[Project API] Project Details List Loaded Error' }))
      )
    ),
  ));

  createProject$ = createEffect(() => this.actions$.pipe(
    ofType('[Project API] Create Project'),
    switchMap((createProjectRequest: CreateProjectRequest) => this.projectService.createProject(createProjectRequest)
      .pipe(
        map(r => ({ type: '[Project API] Create Project Success' })),
        catchError(() => of({ type: '[Project API] Create Project Error' }))
      )
    )
  ));

  // deleteProject$ = createEffect(() => this.actions$.pipe(
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
    private projectService: ProjectService,
  ) {}

}
