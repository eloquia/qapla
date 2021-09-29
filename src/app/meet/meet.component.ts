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
import { DisplayedMeeting, Meeting } from './models/common';

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

  meetings$ = this.meetService.meetings$.pipe(
    map<Meeting[], DisplayedMeeting[]>(ms => {
      const displayedMeetings = ms.map(m => {
        return {
          ...m,
          startDate: Date.parse(m.startDate),
        }
      });
      return displayedMeetings;
    })
  );

  constructor(
    private meetService: MeetService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
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
