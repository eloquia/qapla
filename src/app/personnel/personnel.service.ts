import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Apollo, gql } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, tap, withLatestFrom } from 'rxjs/operators';

import { CreatePersonnelRequest, CreatePersonnelResponse, DeletePersonnelRequest, DeletePersonnelResponse, Personnel, EMPTY_PERSONNEL, UpdatePersonnelRequest, PersonnelNote, DisplayedPersonnel, PersonnelListItem, CreatePersonnelRequestWrapper } from './models';

interface UsersResponse {
  userDetails: Personnel[];
}

@Injectable({
  providedIn: 'root',
})
export class PersonnelService {

  // -- -- -- -- -- -- -- -- -- -- -- -- -- --
  //     Observable Data Sources & Events
  // -- -- -- -- -- -- -- -- -- -- -- -- -- --

  personnel$ = this.store.select(state => state.personnel);

  private personnelListSubject_: BehaviorSubject<PersonnelListItem[]> = new BehaviorSubject<PersonnelListItem[]>([]);
  public personnelList$: Observable<PersonnelListItem[]> = this.personnelListSubject_.asObservable();

  private selectedPersonnelSubject_: Subject<DisplayedPersonnel> = new BehaviorSubject<DisplayedPersonnel>(EMPTY_PERSONNEL);
  public selectedPersonnel$: Observable<DisplayedPersonnel> = this.selectedPersonnelSubject_.asObservable();

  private updatePersonnelEventSubject_: Subject<UpdatePersonnelRequest> = new Subject<UpdatePersonnelRequest>();
  public updatePersonnelEvent$: Observable<UpdatePersonnelRequest> = this.updatePersonnelEventSubject_.asObservable();

  private addPersonnelGoalSubject_: Subject<PersonnelNote> = new Subject<PersonnelNote>();
  addGoalSub = this.addPersonnelGoalSubject_.asObservable().pipe(
    withLatestFrom(this.selectedPersonnelSubject_),
    tap(([goal, personnel]) => {
      const updatedPersonnel: DisplayedPersonnel = JSON.parse(JSON.stringify(personnel));
      if (!updatedPersonnel.goals) {
        updatedPersonnel.goals = []
      }
      updatedPersonnel.goals.push(goal);
      this.selectedPersonnelSubject_.next(updatedPersonnel);
    })
  ).subscribe();

  private removePersonnelGoalSubject_: Subject<number> = new Subject<number>();
  removeGoalSub = this.removePersonnelGoalSubject_.asObservable().pipe(
    withLatestFrom(this.selectedPersonnelSubject_),
    tap(([goalId, personnel]) => {
      const updatedPersonnel: DisplayedPersonnel = JSON.parse(JSON.stringify(personnel));
      if (!updatedPersonnel.goals) {
        // if no goals, there is nothing to remove
        this.selectedPersonnelSubject_.next(updatedPersonnel);
      } else {
        updatedPersonnel.goals = updatedPersonnel.goals.filter(goal => goal.id !== goalId);
        this.selectedPersonnelSubject_.next(updatedPersonnel);
      }
    })
  ).subscribe();

  private addPersonnelExperienceSubject_: Subject<PersonnelNote> = new Subject<PersonnelNote>();
  addExpSub = this.addPersonnelExperienceSubject_.asObservable().pipe(
    withLatestFrom(this.selectedPersonnelSubject_),
    tap(([experience, personnel]) => {
      const updatedPersonnel: DisplayedPersonnel = JSON.parse(JSON.stringify(personnel));
      if (!updatedPersonnel.experiences) {
        updatedPersonnel.experiences = []
      }
      updatedPersonnel.experiences.push(experience);
      this.selectedPersonnelSubject_.next(updatedPersonnel);
    })
  ).subscribe();

  private removePersonnelExperienceSubject_: Subject<number> = new Subject<number>();
  removeExpSub = this.removePersonnelExperienceSubject_.asObservable().pipe(
    withLatestFrom(this.selectedPersonnelSubject_),
    tap(([expId, personnel]) => {
      const updatedPersonnel: DisplayedPersonnel = JSON.parse(JSON.stringify(personnel));
      if (!updatedPersonnel.experiences) {
        // if no goals, there is nothing to remove
        this.selectedPersonnelSubject_.next(updatedPersonnel);
      } else {
        updatedPersonnel.experiences = updatedPersonnel.experiences.filter(exp => exp.id !== expId);
        this.selectedPersonnelSubject_.next(updatedPersonnel);
      }
    })
  ).subscribe();

  private addPersonnelLikeSubject_: Subject<PersonnelNote> = new Subject<PersonnelNote>();
  // addLikeSub = this.addPersonnelLikeSubject_.asObservable().pipe(
  //   withLatestFrom(this.selectedPersonnelSubject_),
  //   tap(([like, personnel]) => {
  //     const updatedPersonnel: DisplayedPersonnel = JSON.parse(JSON.stringify(personnel));
  //     updatedPersonnel.likes.push(like);
  //     this.selectedPersonnelSubject_.next(updatedPersonnel);
  //   })
  // ).subscribe();

  private removePersonnelLikeSubject_: Subject<number> = new Subject<number>();
  // removeLikeSub = this.removePersonnelLikeSubject_.asObservable().pipe(
  //   withLatestFrom(this.selectedPersonnelSubject_),
  //   tap(([likeId, personnel]) => {
  //     const updatedPersonnel: DisplayedPersonnel = JSON.parse(JSON.stringify(personnel));
  //     updatedPersonnel.likes = updatedPersonnel.likes.filter(like => like.id !== likeId);
  //     this.selectedPersonnelSubject_.next(updatedPersonnel);
  //   })
  // ).subscribe();

  private updatePersonnelActivitySubject_: Subject<boolean> = new Subject<boolean>();
  activitySub = this.updatePersonnelActivitySubject_.asObservable().pipe(
    withLatestFrom(this.selectedPersonnelSubject_),
    tap(([isActive, personnel]) => {
      const updatedPersonnel: DisplayedPersonnel = JSON.parse(JSON.stringify(personnel));
      updatedPersonnel.isActive = isActive;
      this.selectedPersonnelSubject_.next(updatedPersonnel);
    })
  ).subscribe();

  constructor(
    private httpClient: HttpClient,
    private apollo: Apollo,
    private store: Store<{ personnel: Personnel[] }>
  ) {
    // GraphQL - Get all personnel
    this.getUsers();
  }

  // public getAllPersonnel(): void {
  //   this.httpClient.get<Personnel[]>('http://localhost:8080/personnel')
  //     .subscribe(response => {
  //       this.personnelsSubject_.next(response);
  //     });
  // }

  public getUsers(): Observable<Personnel[]> {
    return this.apollo.query<UsersResponse>({
      query: gql`
        query getAllPersonnel {
          userDetails {
            id
            firstName
            lastName
            email
            assignedProjects {
              id
              name
            }
          }
        }
      `
    }).pipe(
      map(a => a.data!.userDetails),
      catchError(() => of([]))
    );
  }

  public getPersonnelDetails(id: number | string): Observable<DisplayedPersonnel> {
    return this.httpClient.get<Personnel>(`http://localhost:8080/personnel/${id}`).pipe(
      tap(p => console.log('getting personnel with id', p.id)),
      map<Personnel, DisplayedPersonnel>(personnel => {
        return {
          id: personnel.id,
          firstName: personnel.firstName,
          lastName: personnel.lastName,
          name: `${personnel.firstName} ${personnel.lastName}`,
          goesBy: personnel.goesBy,
          middleName: personnel.middleName,
          email: personnel.email,
          gender: personnel.gender,
          ethnicity: personnel.ethnicity,
          position: personnel.position,
          institution: personnel.institution,
          isActive: personnel.isActive,
          goals: personnel.notes
            ? personnel.notes.filter(note => note.type === 'goal')
            : [],
          experiences: personnel.notes
            ? personnel.notes.filter(note => note.type === 'experience')
            : [],
          likes: personnel.notes
            ? personnel.notes.filter(note => note.type === 'like')
            : [],
          assignedProjects: personnel.assignedProjects,
        }
      })
    );
  }

  public createPersonnel(createPersonnelRequest: CreatePersonnelRequest): Observable<CreatePersonnelResponse> {
    console.log('personnelService.createPersonnel', createPersonnelRequest);
    return this.httpClient.post<CreatePersonnelResponse>('http://localhost:8080/personnel', createPersonnelRequest);
  }

  public createPersonnelGql(createPersonnelRequest: CreatePersonnelRequestWrapper) {
    console.log('createPersonnelGql', createPersonnelRequest)
    return this.apollo.mutate<CreatePersonnelResponse>({
      mutation: gql`
        mutation createPersonnel {
          createPersonnel(input: {
            firstName: "${createPersonnelRequest.payload.firstName}",
            lastName: "${createPersonnelRequest.payload.lastName}",
            middleName: "${createPersonnelRequest.payload.middleName}",
            goesBy: "${createPersonnelRequest.payload.goesBy}",
            email: "${createPersonnelRequest.payload.email}",
            gender: "${createPersonnelRequest.payload.gender}",
            ethnicity: "${createPersonnelRequest.payload.ethnicity}",
            position: "${createPersonnelRequest.payload.position}",
            institution: "${createPersonnelRequest.payload.institution}"
          }) {
            id
          }
        }
      `
    })
  }

  public deletePersonnel(deletePersonnelRequest: DeletePersonnelRequest) {
    console.log('personnelService.deletePersonnel', deletePersonnelRequest)
    return this.apollo.query<DeletePersonnelResponse>({
      query: gql`
        mutation deletePersonnel {
          deletePersonnel(id: "${deletePersonnelRequest.id}") {
            message
          }
        }
      `
    })
  }

  public updatePersonnel(updatePersonnelRequest: UpdatePersonnelRequest): void {
    this.updatePersonnelEventSubject_.next(updatePersonnelRequest);
  }

  public setFocusedPersonnel(personnel: DisplayedPersonnel): void {
    this.selectedPersonnelSubject_.next(personnel);
  }

  public addPersonnelGoal(goal: PersonnelNote): void {
    this.addPersonnelGoalSubject_.next(goal);
  }
  public removePersonnelGoalById(goalId: number): void {
    this.removePersonnelGoalSubject_.next(goalId);
  }
  public addPersonnelExperience(experience: PersonnelNote): void {
    this.addPersonnelExperienceSubject_.next(experience);
  }
  public removePersonnelExperienceById(experienceId: number): void {
    this.removePersonnelExperienceSubject_.next(experienceId);
  }
  public addPersonnelLike(like: PersonnelNote): void {
    this.addPersonnelLikeSubject_.next(like);
  }
  public removePersonnelLikeById(likeId: number): void {
    this.removePersonnelLikeSubject_.next(likeId);
  }

  public setActivity(isActive: boolean): void {
    this.updatePersonnelActivitySubject_.next(isActive);
  }

}
