import { Component, OnInit } from '@angular/core';
import { DatePickerService } from './date-picker/date-picker.service';

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.scss']
})
export class MeetComponent implements OnInit {

  constructor(
    private datePickerService: DatePickerService,
  ) { }

  ngOnInit(): void {
  }

  public handleCreate(): void {
    console.log('Clicked "Create meeting"')
  }

}
