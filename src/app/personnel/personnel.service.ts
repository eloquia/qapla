import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';

import { CreatePersonnelRequest, CreatePersonnelResponse, DeletePersonnelRequest, Personnel, UpdatePersonnelRequest } from './models';

@Injectable()
export class PersonnelService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getAllPersonnel(): Observable<Personnel[]> {
    return this.httpClient.get<Personnel[]>('http://localhost:8080/api/personnel/');
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
