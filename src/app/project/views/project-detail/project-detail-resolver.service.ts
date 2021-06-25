import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { Project } from '../../models';
import { ProjectService } from '../../project.service';

@Injectable()
export class ProjectDetailResolverService implements Resolve<Project> {

  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Project | Observable<Project> | Promise<Project> {
    const slug = route.paramMap.get('slug')!;

    return this.projectService.getProjectBySlug(slug).pipe(
      take(1),
      mergeMap(project => {
        if (project) {
          return of(project);
        } else { // id not found
          this.router.navigate(['/project']);
          return EMPTY;
        }
      })
    );
  }
}
