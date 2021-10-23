import { Component, Input, OnInit } from '@angular/core';

import { Meeting } from '../models/common';

@Component({
  selector: 'app-editable-meeting',
  templateUrl: './editable-meeting.component.html',
  styleUrls: ['./editable-meeting.component.scss']
})
export class EditableMeetingComponent implements OnInit {

  @Input() meetingData: Meeting = JSON.parse(JSON.stringify({}));

  constructor() { }

  ngOnInit(): void {}

}
