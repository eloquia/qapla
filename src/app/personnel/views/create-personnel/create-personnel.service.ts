import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreatePersonnelRequest, CreatePersonnelResponse } from '../../models';

@Injectable()
export class CreatePersonnelService {
  constructor(
    private apollo: Apollo,
  ) {}

  public createPersonnel(createPersonnelRequest: CreatePersonnelRequest): Observable<CreatePersonnelResponse | null | undefined> {
    console.log('createPersonnel')
    return this.apollo.mutate<CreatePersonnelResponse>({
      mutation: gql`
        mutation createPersonnel {
          createPersonnel(input: {
            firstName: "${createPersonnelRequest.firstName}",
            lastName: "${createPersonnelRequest.lastName}",
            middleName: "${createPersonnelRequest.middleName}",
            goesBy: "${createPersonnelRequest.goesBy}",
            email: "${createPersonnelRequest.email}",
            position: "${createPersonnelRequest.position}",
            institution: "${createPersonnelRequest.institution}",
            gender: "${createPersonnelRequest.gender}",
            ethnicity: "${createPersonnelRequest.ethnicity}"
          }) {
            id
          }
        }
      `
    }).pipe(
      map(a => {
        console.log('a', a)
        return a.data;
      })
    )
  }
}