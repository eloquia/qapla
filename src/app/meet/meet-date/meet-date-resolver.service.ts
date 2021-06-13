import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { MeetService } from '../meet.service';
import { Meeting } from '../models';

@Injectable()
export class MeetDateResolverService implements Resolve<Meeting[]> {

  constructor(
    private meetingService: MeetService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Meeting[] | Observable<Meeting[]> | Promise<Meeting[]> {
    const date = route.paramMap.get('date')!;
    console.log('date!', date)

    return this.meetingService.getMeetingsByDate(date).pipe(
      take(1),
      mergeMap(meetings => {
        console.log('meetings from API', meetings)
        if (meetings) {
          return of(meetings);
        } else {
          this.router.navigate(['/meet']);
          return EMPTY
        }
      })
    )
  }
}
