import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { Personnel } from '../../models';
import { PersonnelService } from '../../personnel.service';

@Injectable()
export class PersonnelDetailResolverService implements Resolve<Personnel> {

  constructor(
    private personnelService: PersonnelService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Personnel | Observable<Personnel> | Promise<Personnel> {
    const id = route.paramMap.get('id');

    if (!id) {
      this.router.navigate(['personnel']);
      return EMPTY;
    }

    return this.personnelService.getPersonnelDetails(id).pipe(
      take(1),
      mergeMap(personnel => {
        if (personnel) {
          return of(personnel);
        } else {
          this.router.navigate(['personnel']);
          return EMPTY
        }
      })
    )
  }
}
