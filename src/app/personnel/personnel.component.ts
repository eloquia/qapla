import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Personnel } from './models';
import { PersonnelService } from './personnel.service';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {

  personnelForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    goesBy: [''],
    middleName: [''],
    email: [''],
  });
  showForm: boolean = false;

  personnel: Personnel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private personnelService: PersonnelService,
  ) { }

  ngOnInit(): void {
    this.fetchPersonnel();
  }

  public toggleShowForm(): void {
    this.showForm = !this.showForm;
  }

  public createPersonnel(): void {
    // this.personnelService.createPersonnel({

    // }).subscribe(response => {
    //   console.log('response', response)
    // });
  }

  public fetchPersonnel(): void {
    this.personnelService.getAllPersonnel().subscribe(response => {
      this.personnel = response;
    });
  }

}
