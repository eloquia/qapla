import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { CreatePersonnelRequest, CreatePersonnelResponse, DeletePersonnelRequest, Personnel, UpdatePersonnelRequest } from './models';

@Injectable()
export class PersonnelService {

  private personnelSubject: Subject<Personnel[]> = new BehaviorSubject<Personnel[]>([]);
  public personnel$: Observable<Personnel[]> = this.personnelSubject.asObservable();

  private unassignedPersonnelSubject: Subject<Personnel[]> = new BehaviorSubject<Personnel[]>([]);
  public unassignedPersonnel$: Observable<Personnel[]> = this.unassignedPersonnelSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private toasterService: ToastrService,
  ) { }

  public getAllPersonnel(): void {
    this.httpClient.get<Personnel[]>('http://localhost:8080/api/personnel/')
      .subscribe(response => {
        this.personnelSubject.next(response);
      });
  }

  public getUnassignedPersonnel(): void {
    this.httpClient.get<Personnel[]>('http://localhost:8080/api/personnel?assignedStatus=unassigned')
      .subscribe(response => {
        this.unassignedPersonnelSubject.next(response)
      })
  }

  public createPersonnel(createPersonnelRequest: CreatePersonnelRequest): Observable<CreatePersonnelResponse> {
    console.log('personnelService.createPersonnel', createPersonnelRequest);
    return this.httpClient.post<CreatePersonnelResponse>('http://localhost:8080/api/personnel/', createPersonnelRequest);
  }

  public deletePersonnel(deletePersonnelRequest: DeletePersonnelRequest) {
    console.log('personnelService.deletePersonnel', deletePersonnelRequest)
  }

  public updatePersonnel(updatePersonnelRequest: UpdatePersonnelRequest) {
    console.log('personnelService.updatePersonnel', updatePersonnelRequest)
  }
}
