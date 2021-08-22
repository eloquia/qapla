import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Personnel } from './models';
import { PersonnelService } from './personnel.service';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {

  showForm: boolean = false;

  personnel$: Observable<Personnel[]> = this.personnelService.personnel$;

  constructor(
    private personnelService: PersonnelService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchPersonnel();
  }

  public toggleShowForm(): void {
    this.showForm = !this.showForm;
  }

  public fetchPersonnel(): void {
    this.personnelService.getAllPersonnel();
  }

  public goToPersonnel(id: number): void {
    this.router.navigate([`/personnel/${id}`])
  }

}
