import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DatePickerService } from '../date-picker/date-picker.service';
import { MeetService } from '../meet.service';
import { Meeting, MeetingViewType } from '../models';

@Component({
  selector: 'app-meet-date',
  templateUrl: './meet-date.component.html',
  styleUrls: ['./meet-date.component.scss'],
  animations: [
    trigger("openClose", [
      // ...
      state(
        "open",
        style({
          opacity: 1,
          transform: "scale(1, 1)"
        })
      ),
      state(
        "closed",
        style({
          opacity: 0,
          transform: "scale(0.95, 0.95)"
        })
      ),
      transition("open => closed", [animate("300ms ease-in")]),
      transition("closed => open", [animate("300ms ease-out")])
    ])
  ]
})
export class MeetDateComponent implements OnInit {

  isLoaded: boolean = false;
  get openCloseTrigger() {
    return this.isLoaded ? "open" : "closed";
  }
  toggleMobileMenu() {
    this.isLoaded = !this.isLoaded;
  }

  selectedYear: Observable<number> = this.datePickerService.displayedYear$;
  selectedMonth: Observable<string> = this.datePickerService.displayedMonth$;
  selectedDay: Observable<number> = this.datePickerService.displayedDay$;
  meetingViewType$: Observable<MeetingViewType> = this.meetService.dateType$;

  meetings$: Observable<Meeting[]> = this.meetService.meetings$
    .pipe(
      tap(() => {
        this.isLoaded = true;
      })
    );

  constructor(
    private route: ActivatedRoute,
    private datePickerService: DatePickerService,
    private meetService: MeetService,
  ) { }

  ngOnInit(): void {
    this.route.data
      .subscribe(data => {
        this.meetService.setMeetings(data.meetings);
      });
  }

}
