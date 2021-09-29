import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Meeting } from './meet/models/common';

@Injectable({
  providedIn: 'root'
})
export class RecentService {

  // - - - - - - - - - - - - - - - - - - - -
  //                Meeting
  // - - - - - - - - - - - - - - - - - - - -

  private recentMeetingEvent_: Subject<void> = new Subject<void>();

  private recentMeeting_: Subject<Meeting> = new Subject<Meeting>();
  public recentMeeting$: Observable<Meeting> = this.recentMeetingEvent_.asObservable()
    .pipe(
      switchMap(() => {
        const params: HttpParams = new HttpParams()
          .append('queryType', 'latest');
        return this.httpClient.get<Meeting>('http://localhost:8080/meeting')
      })
    );

  constructor(
    private httpClient: HttpClient,
  ) { }

  public fetchRecentMeeting(): void {

  }

}
