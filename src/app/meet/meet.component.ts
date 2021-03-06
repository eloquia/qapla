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
import { selectDateString, selectMeetings } from '../stores/meeting/selectors';
import { DateActionTypes, MeetingActionTypes, TagActionTypes } from '../stores/meeting/actions';

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
  dateTime$: Observable<DateTime> = this.store.select(selectDateString).pipe(
    map(d => DateTime.fromISO(d))
  )

  meetings$ = this.store.select(selectMeetings)
    .pipe(
      map(ms => ms.map(meeting => {
        return {
          ...meeting,
          startTimeInt: DateTime.fromISO(meeting.startTime).valueOf(),
        }
      })),
      map(ms => ms.sort((a, b) => DateTime.fromISO(a.startTime).valueOf() - DateTime.fromISO(b.startTime).valueOf() ))
    );

  constructor(
    private meetService: MeetService,
    public dialog: MatDialog,
    private store: Store<IMeetingState>,
  ) {}

  ngOnInit(): void {
    const dt: string = DateTime.now().toISO();
    this.store.dispatch({ type: MeetingActionTypes.GET_MEETINGS_BY_DATE, payload: dt })
    this.store.dispatch({ type: TagActionTypes.GET_TAG_LIST })
  }

  selectDate($event: any) {
    this.meetService.updateDate($event)
  }

  openCreateMeeting(): void {
    const dialogRef = this.dialog.open(CreateMeetingComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(() => {
      const dt: string = DateTime.now().toISO();
      this.store.dispatch({ type: MeetingActionTypes.GET_MEETINGS_BY_DATE, payload: dt })
    });
  }

  public handleDateChange($event: MatDatepickerInputEvent<any, any>) {
    const dt: DateTime = $event.value;
    this.store.dispatch({ type: DateActionTypes.SET_DATE, payload: dt.toISO() })
  }

}
