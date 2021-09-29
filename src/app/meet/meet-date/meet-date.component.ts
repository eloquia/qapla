import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { MeetService } from '../meet.service';
import { Meeting } from '../models/common';

@Component({
  selector: 'app-meet-date',
  templateUrl: './meet-date.component.html',
  styleUrls: ['./meet-date.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state(
        'open',
        style({
          opacity: 1,
          transform: 'scale(1, 1)',
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'scale(0.95, 0.95)',
        })
      ),
      transition('open => closed', [animate('300ms ease-in')]),
      transition('closed => open', [animate('300ms ease-out')]),
    ]),
  ],
})
export class MeetDateComponent implements OnInit {

  date$: Observable<Date> = this.meetService.date$.pipe(
    map<DateTime, Date>(dt => {
      return dt.toJSDate();
    }),
    tap(d => console.log('d', d))
  );

  meetings$: Observable<Meeting[]> = this.meetService.meetings$;

  constructor(
    private route: ActivatedRoute,
    private meetService: MeetService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.meetService.setMeetings(data.meetings);
    });
  }

}
