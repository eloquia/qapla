import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProjectDetails } from '../../models';
import { ProjectService } from '../../project.service';

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
      map(a => {
        console.log('map', a)
        const data: ProjectDetailsResponse = a.data;
        return data.projectDetails
        // return projectDetails;
      })
    );

    // return this.projectService.getProjectBySlug(slug).pipe(
    //   take(1),
    //   mergeMap(project => {
    //     if (project) {
    //       return of(project);
    //     } else { // id not found
    //       this.router.navigate(['/project']);
    //       return EMPTY;
    //     }
    //   })
    // );
  }
}
