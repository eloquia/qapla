import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { MeetService } from '../meet.service';

import { DatePickerDay } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DatePickerService {

  // -------------------- Data ----------------------

  // list of all days displayed in the calendar
  private calendarDaysSubject_: Subject<DatePickerDay[]> = new BehaviorSubject<DatePickerDay[]>([]);
  public calendarDays$: Observable<DatePickerDay[]> = this.calendarDaysSubject_.asObservable();

  // the latest day the user has selected--not month or year
  private selectedDateSubject_: Subject<number> = new BehaviorSubject<number>(DateTime.now().day);
  public selectedDate$: Observable<number> = this.selectedDateSubject_.asObservable();

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
  public initialMonth: string = DateTime.now().toFormat('MMM');

  // the month the user has chosen from the dropdown
  private selectedMonthSubject_: Subject<string> = new BehaviorSubject<string>(DateTime.now().toFormat('MMM'));
  public selectedMonth$: Observable<string> = this.selectedMonthSubject_.asObservable();

  public years: number[] = [2020, 2021, 2022];
  public initialYear: number = DateTime.now().year;

  // the year the user has chosen from the dropdown
  private selectedYearSubject_: Subject<number> = new BehaviorSubject<number>(DateTime.now().year);
  public selectedYear$: Observable<number> = this.selectedYearSubject_.asObservable();

  // displayed dates
  private displayedYearSubject_: Subject<number> = new BehaviorSubject<number>(DateTime.now().year);
  public displayedYear$: Observable<number> = this.displayedYearSubject_.asObservable();

  private displayedMonthSubject_: Subject<string> = new BehaviorSubject<string>(DateTime.now().toFormat('MMM'));
  public displayedMonth$: Observable<string> = this.displayedMonthSubject_.asObservable();

  private displayedDaySubject_: Subject<number> = new BehaviorSubject<number>(DateTime.now().day);
  public displayedDay$: Observable<number> = this.displayedDaySubject_.asObservable();

  // every time month or year changes, update the list of days
  updateMonthYearhSub = combineLatest([this.selectedYear$, this.selectedMonth$])
    .pipe(map(([year, month]) => {
      const dt = DateTime.fromFormat(`${year}-${month}`, 'yyyy-MMM').startOf('day');

      // Monday is 1, so Sunday must be 0
      const numPaddedDays = dt.weekday % 7;
      const paddedDays: string[] = Array.from(Array(numPaddedDays).keys()).map(() => '');
      const actualDays: string[] = Array.from(Array(dt.daysInMonth).keys()).map(n => `${n + 1}`);
      const allDays = paddedDays.concat(actualDays);

      // TODO: eventually refactor this to use this.computeCalendarDays()
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
      this.calendarDaysSubject_.next(days);
    })
  ).subscribe();

  // every time a day is clicked, do the following:
  // 1. Update displayed dates
  // 2. Update routing
  // 3. Update calendar days
  monthYear = combineLatest([this.selectedMonth$, this.selectedYear$])
  mnotyYearSub = this.selectedDate$.pipe(
    withLatestFrom(this.monthYear)
  ).subscribe(dates => {
    const day = dates[0];
    const month = dates[1][0]
    const monthNumber: string = `${DateTime.fromFormat(`${month}`, 'MMM').toFormat('MM')}`;
    const year = dates[1][1]
    this.displayedYearSubject_.next(year);
    this.displayedMonthSubject_.next(month);
    this.displayedDaySubject_.next(day);

    const dateString = `${year}-${monthNumber}-${day}`;
    this.router.navigate([`/meet/${dateString}`])

    const calendarDays: DatePickerDay[] = this.computeCalendarDays(year, month, day);
    this.calendarDaysSubject_.next(calendarDays);

    this.meetService.getMeetingsByDate(dateString);
  });

  // -------------------- Constructor ----------------------

  constructor(
    private router: Router,
    private meetService: MeetService,
  ) { }

  public updateMonth(month: string): void {
    this.selectedMonthSubject_.next(month);
  }

  public updateYear(year: number): void {
    this.selectedYearSubject_.next(year);
  }

  /**
   * Things that should happen when a day is picked:
   * * Fetch meetings from that date
   * * Update displayed date
   * @param day
   */
  public handleSelectedDay(day: string): void {
    this.selectedDateSubject_.next(parseInt(day));
  }

  /**
   * Function that calculates the days in the calendar.
   * @param year
   * @param month
   * @param day
   * @returns
   */
  private computeCalendarDays(year: number, month: string, day: number): DatePickerDay[] {
    // TODO: refactor to handle optional day input
    const dt = DateTime.fromFormat(`${year}-${month}`, 'yyyy-MMM').startOf('day');

    // Monday is 1, so Sunday must be 0
    const numPaddedDays = dt.weekday % 7;
    const paddedDays: string[] = Array.from(Array(numPaddedDays).keys()).map(() => ''); // blank days on the calendar before actual days
    const actualDays: string[] = Array.from(Array(dt.daysInMonth).keys()).map(n => `${n + 1}`);
    const allDays = paddedDays.concat(actualDays);

    // apply properties to
    const allDatePickerDays: DatePickerDay[] = allDays.map<DatePickerDay>(displayValue => {
      const iteratedDate = DateTime.fromFormat(`${year}-${month}-${displayValue}`, 'yyyy-MMM-d').startOf('day').toMillis()
      const todaysDate = DateTime.now().startOf('day').toMillis()
      const isToday = todaysDate === iteratedDate

      const selectedDate = DateTime.fromFormat(`${year}-${month}-${day}`, 'yyyy-MMM-d').toMillis();
      const isSelectedDay = iteratedDate === selectedDate;

      return {
        displayValue,
        isToday,
        isSelectedDay,
      }
    });

    return allDatePickerDays;
  }

}
