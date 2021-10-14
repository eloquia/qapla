import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular';

import { DisplayedPersonnel } from '../../models';

interface UserDetailResponse {
  getUserById: {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
  }
}

@Injectable()
export class PersonnelDetailResolverService implements Resolve<DisplayedPersonnel> {

  constructor(
    private router: Router,
    private apollo: Apollo,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): DisplayedPersonnel | Observable<DisplayedPersonnel> | Promise<DisplayedPersonnel> {
    const id = route.paramMap.get('id');

    if (!id) {
      this.router.navigate(['personnel']);
      return EMPTY;
    }

    return this.apollo.query<UserDetailResponse>({
      query: gql`
        query userDetailById {
          getUserById(id: "${id}") {
            id
            firstName
            lastName
          }
        }
      `
    }).pipe(
      map(a => {
        return {
          id: a.data.getUserById.id,
          firstName: a.data.getUserById.firstName,
          lastName: a.data.getUserById.lastName,
        }
      })
    );
  }
}
