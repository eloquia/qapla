import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AttendanceStatus } from '../models';

@Component({
  selector: 'app-attendance-selector',
  templateUrl: './attendance-selector.component.html',
  styleUrls: ['./attendance-selector.component.scss']
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

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.attendanceForm.setControl('attendanceStatus', new FormControl(this.initialOption));
    this.attendanceForm.get('attendanceStatus')?.valueChanges.subscribe(attendanceStatus => {
      this.attendanceSelectEvent.emit(attendanceStatus);
    })
  }

}