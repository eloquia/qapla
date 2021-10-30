import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ProjectDetails } from '../../models';

interface ProjectDetailsResponse {
  projectDetails: ProjectDetails
}

@Injectable()
export class ProjectDetailResolverService implements Resolve<ProjectDetails> {

  constructor(
    private apollo: Apollo,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ProjectDetails | Observable<ProjectDetails> | Promise<ProjectDetails> {
    const slug = route.paramMap.get('slug')!;
    return this.apollo.query<ProjectDetailsResponse>({
      query: gql`
        query projectDetailsBySlug {
          projectDetails(slug: "${slug}") {
            id
            name
            description
          }
        }
      `,
    }).pipe(
      map(a => a.data!.projectDetails),
      catchError(() => EMPTY)
    );
  }
}
