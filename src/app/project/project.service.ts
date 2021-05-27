import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { CreateProjectRequest, CreateProjectResponse, Project } from './models';

@Injectable()
export class ProjectService {

  private projectSubject: Subject<Project[]> = new BehaviorSubject<Project[]>([]);
  public projects$: Observable<Project[]> = this.projectSubject.asObservable();

  private getProjectsSubject: Subject<void> = new Subject<void>();
  getProjects$: Observable<void> = this.getProjectsSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
  ) {

  }

  public createProject(createProjectRequest: CreateProjectRequest): Observable<any> {
    console.log('projectService.createProject()!')
    return this.httpClient.post<CreateProjectResponse>('http://localhost:8080/api/project/', createProjectRequest)
      .pipe(
        catchError(this.httpError)
      )
  }

  public getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>('http://localhost:8080/api/project/');
  }

  public deleteProjectById(id: number) {
    console.log(`deleting project with id ${id}`)
    return this.httpClient.delete(`http://localhost:8080/api/project/${id}`);
  }

  httpError(error: any) {
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
