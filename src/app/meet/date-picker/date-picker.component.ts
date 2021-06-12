import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { DatePickerDay } from '../models';
import { DatePickerService } from './date-picker.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit, OnDestroy {

  days: Observable<DatePickerDay[]> = this.datePickerService.days$;
  monthOptions: string[] = this.datePickerService.monthOptions;
  years: number[] = this.datePickerService.years;

  datePickerForm = this.formBuilder.group({
    month: [this.datePickerService.initialMonth],
    year: [this.datePickerService.initialYear],
  });

  monthSubscription: Subscription | undefined = this.datePickerForm.get('month')?.valueChanges.subscribe(month => this.datePickerService.updateMonth(month));
  yearSubscription: Subscription | undefined = this.datePickerForm.get('year')?.valueChanges.subscribe(year => this.datePickerService.updateYear(year));

  constructor(
    private datePickerService: DatePickerService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    if (this.monthSubscription && !this.monthSubscription.closed) {
      this.monthSubscription.unsubscribe();
    }
    if (this.yearSubscription && !this.yearSubscription.closed) {
      this.yearSubscription.unsubscribe();
    }
  }

}
