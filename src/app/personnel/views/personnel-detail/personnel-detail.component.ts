import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Personnel } from '../../models';

@Component({
  selector: 'app-personnel-detail',
  templateUrl: './personnel-detail.component.html',
  styleUrls: ['./personnel-detail.component.scss']
})
export class PersonnelDetailComponent implements OnInit {

  personnel!: Personnel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.data
      .subscribe(data => {
        this.personnel = data.personnel;
      });
  }

  backToPersonnel(): void {
    this.router.navigate(['personnel'])
  }

}
