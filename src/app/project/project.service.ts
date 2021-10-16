import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, EMPTY, Observable, Subject, Subscription, throwError } from 'rxjs';
import { switchMap, tap, withLatestFrom, map } from 'rxjs/operators';
import { WarningToastConfig } from '../core/models';

import { CreateProjectRequest, CreateProjectResponse, EMPTY_PROJECT, Project, ProjectDetails, ProjectListItem } from './models';

interface ProjectDetailsResponse {
  projectDetailsList: ProjectDetails[];
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  private currentSlug: string = '';

  private projectListItemsSubject_: Subject<ProjectListItem[]> = new BehaviorSubject<ProjectListItem[]>([]);
  public projectListItems$: Observable<ProjectListItem[]> = this.projectListItemsSubject_.asObservable();

  private projectsSubject_: Subject<Project[]> = new BehaviorSubject<Project[]>([]);
  public projects$: Observable<Project[]> = this.projectsSubject_.asObservable();

  private selectedProjectSubject_: Subject<Project> = new BehaviorSubject<Project>(EMPTY_PROJECT);
  public selectedProject$: Observable<Project> = this.selectedProjectSubject_.asObservable();

  private getProjectsSubject_: Subject<void> = new Subject<void>();
  public getProjects$: Observable<void> = this.getProjectsSubject_.asObservable();

  private createProjectSubject_: Subject<void> = new Subject();
  public createProject$: Observable<void> = this.createProjectSubject_.asObservable();

  // -------------------- Events ----------------------

  private getProjectsEventSubject_: Subject<void> = new Subject<void>();
  // private getProjectsSub: Subscription = this.getProjectsEventSubject_.asObservable().pipe(
  //   switchMap(() => {
  //     return this.httpClient.get<Project[]>('http://localhost:8080/project')
  //   })
  // ).subscribe({
  //   next: (projects) => {
  //     this.projectsSubject_.next(projects);
  //   },
  //   error: (e) => {
  //     this.toasterService.warning(
  //       `Could not fetch projects: ${e}`,
  //       `Uh Oh`,
  //       WarningToastConfig,
  //     )
  //   }
  // });

  private updateProjectEventSubject_: Subject<void> = new Subject<void>();
  private updateProjectSubscription$: Subscription = this.updateProjectEventSubject_.asObservable().pipe(
    withLatestFrom(this.selectedProject$),
    switchMap(([_, project]) => this.updateProject(project.id, project))
  ).subscribe();

  private updateProjectPersonnelEventSubject_: Subject<number[]> = new Subject<number[]>();
  private updateProjectPersonnel$ = this.updateProjectPersonnelEventSubject_.asObservable().pipe(
    withLatestFrom(this.selectedProject$),
    switchMap(([personnel, project]) => {
      project.assignedPersonnelIDs = personnel;
      return this.updateProject(project.id, project);
    })
  ).subscribe();

  private addProjectPersonnelEventSubject_: Subject<number[]> = new Subject<number[]>();
  private addProjectPersonnel$ = this.addProjectPersonnelEventSubject_.asObservable().pipe(
    withLatestFrom(this.selectedProjectSubject_),
    switchMap(([addedPersonnel, project]) => {

      if (addedPersonnel) {

        const updatedProjectParams = {
          id: project.id,
          name: project.name,
          description: project.description,

          /*
            convoluted, but basically short hand for:
            1. if project has personnelIDs, then add to that
            2. else if project has personnel, then add to that
            3. else the project does not have any personnel, so use the provided IDs
          */
          assignedPersonnelIDs: project.assignedPersonnelIDs
            ? project.assignedPersonnelIDs.concat(addedPersonnel)
            : project.personnel
              ? project.personnel.map(person => person.id).concat(addedPersonnel)
              : addedPersonnel,
        }

        return this.updateProject(project.id, updatedProjectParams);
      } else {
        // no personnel to add--don't do anything
        return EMPTY;
      }
    }),
    switchMap(() => this.refreshProject()),
    tap(project => {
      this.toasterService.success(`Updated ${project.name}`, 'Success!', {
        progressBar: true,
        closeButton: true,
        timeOut: 3000,
        });
      })
  ).subscribe();

  private removeProjectPersonnelEventSubject_: Subject<{remove: boolean}[]> = new Subject<{remove: boolean}[]>();
  private removeProjectPersonnel$ = this.removeProjectPersonnelEventSubject_.asObservable().pipe(
    withLatestFrom(this.selectedProjectSubject_),
    switchMap(([personnelRemovalArray, project]) => {

      // personnelRemovalArray is an array of remove:boolean
      // each index in this array corresponds with project.assignedPersonnel
      let updatedPersonnelIDs: number[] = [];
      if (project.personnel) {
        updatedPersonnelIDs = project.personnel
          .map(assignedPerson => assignedPerson.id)
          .filter((personId, idx) => !personnelRemovalArray[idx].remove);

      } else if (project.assignedPersonnelIDs) {
        updatedPersonnelIDs = project.assignedPersonnelIDs
          .filter((personId, idx) => !personnelRemovalArray[idx].remove);
      }

      const updatedProjectParams = {
        id: project.id,
        name: project.name,
        description: project.description,
        assignedPersonnelIDs: updatedPersonnelIDs,
      }

      return this.updateProject(updatedProjectParams.id, updatedProjectParams);
    }),
    switchMap(() => this.refreshProject()),
    tap(project => {
      this.toasterService.success(`Updated ${project.name}`, 'Success!', {
        progressBar: true,
        closeButton: true,
        });
      })
  ).subscribe();

  private refreshProjectEventSubject_: Subject<any> = new Subject<any>();
  private refreshProject$ = this.refreshProjectEventSubject_.asObservable().pipe().subscribe();

  constructor(
    private httpClient: HttpClient,
    private toasterService: ToastrService,
    private apollo: Apollo,
  ) {
    this.getAllProjects()
  }

  public createProject(createProjectRequest: CreateProjectRequest): Observable<number> {
    return this.apollo.query<CreateProjectResponse>({
      query: gql`
        mutation createProject {
          createProject(input: {
            name: "${createProjectRequest.name}",
            description: "${createProjectRequest.description}"
          }) {
            id
          }
        }
      `
    }).pipe(
      map(a => a.data.id)
    )
  }

  public getAllProjects(): Observable<Project[]> {
    return this.apollo
      .query<ProjectDetailsResponse>({
        query: gql`
          query findProjects {
            projectDetailsList {
              id
              name
              slug
              personnel {
                id
                firstName
              }
            }
          }
        `,
      }).pipe(
        map((result) => result.data.projectDetailsList)
      );
  }

  public getProjectDetails(id: number | string): Observable<Project> {
    return this.httpClient.get<Project>(`http://localhost:8080/project/${id}`);
  }

  public getProjectByName(name: string): Observable<Project> {
    return this.httpClient.get<Project>(`http://localhost:8080/project/${name}?search`)
  }

  public getProjectBySlug(slug: string): Observable<Project> {
    this.currentSlug = slug;
    return this.httpClient.get<Project>(`http://localhost:8080/project/${slug}?searchTerm=slug`).pipe(
      tap(project => this.selectedProjectSubject_.next(project))
    );
  }

  public refreshProject(): Observable<Project> {
    return this.httpClient.get<Project>(`http://localhost:8080/project/${this.currentSlug}?searchTerm=slug`).pipe(
      tap(project => this.selectedProjectSubject_.next(project))
    );
  }

  public deleteProjectById(id: number, name: string): void {
    this.httpClient.delete(`http://localhost:8080/project/${id}`)
      .subscribe(() => {
        this.toasterService.success(`Deleted ${name}`, 'Success!', {
          progressBar: true,
          closeButton: true,
        });
        this.getAllProjects();
      });
  }

  public updateProject(projectId: number, updatedProject: Project): Observable<Project> {
    return this.httpClient.put<Project>(`http://localhost:8080/project/${projectId}`, updatedProject);
  }

  public updateProjectPersonnel(personnel: number[]): void {
    this.updateProjectPersonnelEventSubject_.next(personnel);
  }

  public addProjectPersonnel(personnel: number[]): void {
    this.addProjectPersonnelEventSubject_.next(personnel);
  }

  public removeProjectPersonnel(personnelRemovalArray: {remove: boolean}[]): void {
    this.removeProjectPersonnelEventSubject_.next(personnelRemovalArray);
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
