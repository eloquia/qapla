import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';

import { DatePickerDay } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DatePickerService {

  // list of all days displayed in the calendar
  private daysSubject: Subject<DatePickerDay[]> = new BehaviorSubject<DatePickerDay[]>([]);
  public days$: Observable<DatePickerDay[]> = this.daysSubject.asObservable();

  public monthOptions: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  private selectedMonthSubject: Subject<string> = new BehaviorSubject<string>(DateTime.now().toFormat('MMM'));
  public selectedMonth$: Observable<string> = this.selectedMonthSubject.asObservable();
  public initialMonth: string = DateTime.now().toFormat('MMM');

  public years: number[] = [2020, 2021, 2022];
  private selectedYearSubject: Subject<number> = new BehaviorSubject<number>(DateTime.now().year);
  public selectedYear$: Observable<number> = this.selectedYearSubject.asObservable();
  public initialYear: number = DateTime.now().year;

  private selectedDateSubject: Subject<number> = new BehaviorSubject<number>(DateTime.now().day);
  public selectedDate$: Observable<number> = this.selectedDateSubject.asObservable();

  private updateDateSubject: Subject<any> = new BehaviorSubject<any>(null);
  public updateDate$: Observable<any> = this.updateDateSubject.asObservable();

  // displayed dates
  private displayedYearSubject: Subject<number> = new BehaviorSubject<number>(DateTime.now().year);
  public displayedYear$: Observable<number> = this.displayedYearSubject.asObservable();

  private displayedMonthSubject: Subject<string> = new BehaviorSubject<string>(DateTime.now().toFormat('MMM'));
  public displayedMonth$: Observable<string> = this.displayedMonthSubject.asObservable();

  private displayedDaySubject: Subject<number> = new BehaviorSubject<number>(DateTime.now().day);
  public displayedDay$: Observable<number> = this.displayedDaySubject.asObservable();

  constructor(
    private router: Router,
  ) {
    // every time month or year changes, update the list of days
    combineLatest([this.selectedYear$, this.selectedMonth$])
      .pipe(map(([year, month]) => {
        const dt = DateTime.fromFormat(`${year}-${month}`, 'yyyy-MMM').startOf('day');

        // Monday is 1, so Sunday must be 0
        const numPaddedDays = dt.weekday % 7;
        const paddedDays: string[] = Array.from(Array(numPaddedDays).keys()).map(() => '');
        const actualDays: string[] = Array.from(Array(dt.daysInMonth).keys()).map(n => `${n + 1}`);
        const allDays = paddedDays.concat(actualDays);

        const allDatePickerDays: DatePickerDay[] = allDays.map<DatePickerDay>(displayValue => {
          const todaysDate = DateTime.now().startOf('day').toMillis()
          const iteratedDate = DateTime.fromFormat(`${year}-${month}-${displayValue}`, 'yyyy-MMM-d').startOf('day').toMillis()
          const isToday = todaysDate === iteratedDate

          const selectedDate = DateTime.fromFormat(`${this.selectedYear$}-${this.selectedMonth$}-${this.selectedDate$}`, 'yyyy-MMM-d').toMillis();
          const isSelectedDay = iteratedDate === selectedDate;

          return {
            displayValue,
            isToday,
            isSelectedDay,
          }
        });

        return allDatePickerDays;
      }),
      tap(days => {
        this.daysSubject.next(days);
      })
    ).subscribe();

    // every time a day is clicked, take values from year, month, and day, and pass them to displayed dates
    const monthYear = combineLatest([this.selectedMonth$, this.selectedYear$])
    this.updateDate$.pipe(
      withLatestFrom(monthYear)
    ).subscribe(dates => {
      const day = dates[0];
      const month = dates[1][0]
      const monthNumber: string = `${DateTime.fromFormat(`${month}`, 'MMM').toFormat('MM')}`;
      const year = dates[1][1]
      this.displayedYearSubject.next(year);
      this.displayedMonthSubject.next(month);
      this.displayedDaySubject.next(day);
      this.router.navigate([`/meet/${year}-${monthNumber}-${day}`])
    });
  }

  public updateMonth(month: string): void {
    this.selectedMonthSubject.next(month);
  }

  public updateYear(year: number): void {
    this.selectedYearSubject.next(year);
  }

  /**
   * Things that should happen when a day is picked:
   * * Fetch meetings from that date
   * * Update displayed date
   * @param day
   */
  public handleSelectedDay(day: string): void {
    this.updateDateSubject.next(parseInt(day));
  }

}
