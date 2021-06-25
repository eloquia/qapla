import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Meeting } from './models';

@Injectable({
  providedIn: 'root',
})
export class MeetService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getMeetingsByDate(date: string): Observable<Meeting[]> {
    return this.httpClient.get<Meeting[]>(`http://localhost:8080/meeting/${date}`);
  }

  public createMeeting(meetingDetails: Meeting): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/meeting', meetingDetails);
  }
}
