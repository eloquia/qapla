import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AttendanceStatus } from '../models/common';

const withoutNoShow = [
  'Attending',
  'Leave Early',
  'Joining Late',
  'Not Attending',
];

const withNoShow = [
  'Attending',
  'Leave Early',
  'Joining Late',
  'Not Attending',
  'No Show',
];

@Component({
  selector: 'app-attendance-selector',
  templateUrl: './attendance-selector.component.html',
  styleUrls: ['./attendance-selector.component.scss'],
})
export class AttendanceSelectorComponent implements OnInit {
  attendanceForm = this.formBuilder.group({
    attendanceStatus: [''],
  });

  chosenOption: string = 'Attending';

  @Input()
  enableNoShow: boolean = false;

  @Input()
  initialOption: AttendanceStatus = 'Attending';

  @Output()
  attendanceSelectEvent: EventEmitter<AttendanceStatus> = new EventEmitter();

  options: string[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    console.log('this.initialOption', this.initialOption);
    this.attendanceForm.setControl(
      'attendanceStatus',
      new FormControl(this.initialOption)
    );
    this.attendanceForm
      .get('attendanceStatus')
      ?.valueChanges.subscribe((attendanceStatus) => {
        this.attendanceSelectEvent.emit(attendanceStatus);
      });

    this.options = this.enableNoShow ? withNoShow : withoutNoShow;
  }

  public handleChange($event: any): void {
    this.attendanceForm.controls.attendanceStatus.setValue($event.target.value);
    this.attendanceSelectEvent.emit($event.target.value);
  }
}
