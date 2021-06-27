import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DatePickerService } from '../date-picker/date-picker.service';
import { MeetService } from '../meet.service';
import { Meeting } from '../models';

@Component({
  selector: 'app-meet-date',
  templateUrl: './meet-date.component.html',
  styleUrls: ['./meet-date.component.scss']
})
export class MeetDateComponent implements OnInit {

  selectedYear: Observable<number> = this.datePickerService.displayedYear$;
  selectedMonth: Observable<string> = this.datePickerService.displayedMonth$;
  selectedDay: Observable<number> = this.datePickerService.displayedDay$;
  meetings$: Observable<Meeting[]> = this.meetService.meetings$;

  constructor(
    private route: ActivatedRoute,
    private datePickerService: DatePickerService,
    private meetService: MeetService,
  ) { }

  ngOnInit(): void {
    this.route.data
      .pipe(
        tap(data => {
          console.log('data', data)
        })
      )
      .subscribe(data => {
        // this.meetings = data.personnel;
        this.meetService.setMeetings(data.meetings);
      });
  }

}
