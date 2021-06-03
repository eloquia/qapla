import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';

import { CreateProjectRequest, CreateProjectResponse, Project } from './models';

@Injectable()
export class ProjectService {

  private projectSubject: Subject<Project[]> = new BehaviorSubject<Project[]>([]);
  public projects$: Observable<Project[]> = this.projectSubject.asObservable();

  private selectedProjectSubject: Subject<Project> = new Subject<Project>();
  public selectedProject$: Observable<Project> = this.selectedProjectSubject.asObservable();

  private getProjectsSubject: Subject<void> = new Subject<void>();
  getProjects$: Observable<void> = this.getProjectsSubject.asObservable();

  private createProjectSubject: Subject<void> = new Subject();
  createProject$: Observable<void> = this.createProjectSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private toasterService: ToastrService,
  ) {

  }

  public createProject(createProjectRequest: CreateProjectRequest): void {
    this.httpClient.post<CreateProjectResponse>('http://localhost:8080/api/project/', createProjectRequest)
      .subscribe(() => {
        this.toasterService.success('Created Project', 'Success!', {
          progressBar: true,
          closeButton: true,
        });
      });
  }

  public getAllProjects(): void {
    this.httpClient.get<Project[]>('http://localhost:8080/api/project/')
      .subscribe(response => {
        this.projectSubject.next(response);
      });
  }

  public getProjectDetails(id: number | string): Observable<Project> {
    return this.httpClient.get<Project>(`http://localhost:8080/api/project/${id}`);
  }

  public deleteProjectById(id: number, name: string): void {
    this.httpClient.delete(`http://localhost:8080/api/project/${id}`)
      .subscribe(() => {
        this.toasterService.success(`Deleted ${name}`, 'Success!', {
          progressBar: true,
          closeButton: true,
        });
      });
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
