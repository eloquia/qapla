import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';

import { MeetService } from './meet.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { IMeetingState } from '../stores/meeting/state';
import { Store } from '@ngrx/store';
import { selectMeetings } from '../stores/meeting/selectors';

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.scss'],
})
export class MeetComponent implements OnInit {
  date: any;
  date$: Observable<Date> = this.meetService.date$.pipe(
    map<DateTime, Date>(dt => {
      return dt.toJSDate();
    })
  );

  meetings$ = this.store.select(selectMeetings)
    .pipe(
      map(ms => ms.sort((a, b) => DateTime.fromISO(a.startDate).valueOf() - DateTime.fromISO(b.startDate).valueOf() ))
    );

  constructor(
    private meetService: MeetService,
    public dialog: MatDialog,
    private store: Store<IMeetingState>,
  ) {}

  ngOnInit(): void {
    const dt: string = DateTime.now().toISO();
    this.store.dispatch({ type: '[Meeting API] Get Meetings By Date', payload: dt })
    this.store.dispatch({ type: '[Meeting API] Get Tag List' })
  }

  selectDate($event: any) {
    this.meetService.updateDate($event)
  }

  openCreateMeeting(): void {
    const dialogRef = this.dialog.open(CreateMeetingComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The createMeetingDialog was closed');
    });
  }

  public handleDateChange($event: MatDatepickerInputEvent<any, any>) {
    this.meetService.updateDate($event.value)
  }

}
