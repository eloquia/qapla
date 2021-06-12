import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DatePickerDay } from '../../models';
import { DatePickerService } from '../date-picker.service';

@Component({
  selector: 'app-date-picker-day',
  template: `<div
      class="date-picker-day"
      class="w-6 h-6 flex items-center justify-center hover:cursor-pointer hover:bg-green-100"
      [class]="{
        'cursor-pointer': !!displayValue,
        'border': isToday,
        'border-green-500': isToday,
        'bg-red-100': isSelectedDay
      }"
      (click)="handleClick()">
    <span>{{displayValue}}</span>
  </div>`,
})
export class DatePickerDayComponent implements OnInit {

  @Input() displayValue: string = '';
  @Input() isToday: boolean = false;
  @Input() isSelectedDay: boolean = false;

  @Output() pick: EventEmitter<DatePickerDay> = new EventEmitter();

  constructor(
    private datePickerService: DatePickerService,
  ) { }

  ngOnInit(): void {
  }

  public handleClick() {
    this.datePickerService.handleSelectedDay(this.displayValue);
  }

}
