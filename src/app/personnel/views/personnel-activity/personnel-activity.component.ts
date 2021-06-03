import { Component, Input, OnInit } from '@angular/core';

import { PersonnelRecentActivity } from '../../models';

@Component({
  selector: 'app-personnel-activity',
  templateUrl: './personnel-activity.component.html',
  styleUrls: ['./personnel-activity.component.scss']
})
export class PersonnelActivityComponent implements OnInit {

  // @Input()
  // activity: PersonnelRecentActivity;

  constructor() { }

  ngOnInit(): void {
  }

}
