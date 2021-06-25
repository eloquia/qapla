import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { DisplayedPersonnel } from '../../models';
import { PersonnelService } from '../../personnel.service';

@Injectable()
export class PersonnelDetailResolverService implements Resolve<DisplayedPersonnel> {

  constructor(
    private personnelService: PersonnelService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): DisplayedPersonnel | Observable<DisplayedPersonnel> | Promise<DisplayedPersonnel> {
    const id = route.paramMap.get('id');

    if (!id) {
      this.router.navigate(['personnel']);
      return EMPTY;
    }

    return this.personnelService.getPersonnelDetails(id).pipe(
      take(1),
      mergeMap(displayedPersonnel => {
        if (displayedPersonnel) {
          return of(displayedPersonnel);
        } else {
          this.router.navigate(['personnel']);
          return EMPTY
        }
      })
    )
  }
}
