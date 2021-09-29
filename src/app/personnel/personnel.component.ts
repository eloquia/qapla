import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { DisplayedPersonnel } from './models';
import { PersonnelService } from './personnel.service';

const initialPageEvent: PageEvent = {
  previousPageIndex: 0,
  pageIndex: 0,
  pageSize: 10,
  length: 0,
}

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {

  displayedColumns: string[] = ['name', 'projects']

  personnel$: Observable<DisplayedPersonnel[]> = this.personnelService.personnel$
    .pipe(
      map(ps => {
        if (!ps) {
          return [];
        }

        const dp: DisplayedPersonnel[] = ps.map(p => {
          return {
            ...p,
            projects: p.assignedProjects ? p.assignedProjects.map(project => project.name) : [],
          }
        });

        return dp;
      })
    );

  // -- -- -- -- -- -- -- -- -- -- --
  //            Paginator
  // -- -- -- -- -- -- -- -- -- -- --
  pageSizeOptions = [10, 25, 50];
  pageSize = this.pageSizeOptions[0];

  private pageEventSubject_: Subject<PageEvent> = new BehaviorSubject<PageEvent>(initialPageEvent);

  public displayedPersonnel$: Observable<DisplayedPersonnel[]> = combineLatest([this.pageEventSubject_, this.personnelService.personnel$]).pipe(
    map(a => {
      const pageEvent = a[0];
      const ps = a[1];

      const length = ps.length;
      const start = pageEvent.pageIndex * pageEvent.pageSize;
      const end = (pageEvent.pageIndex + 1) * pageEvent.pageSize;

      let r;

      if (end > length) {
        r = ps.slice(start, length)
      } else {
        r = ps.slice(start, end)
      }

      return r;
    })
  )

  constructor(
    private personnelService: PersonnelService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  public showForm(): void {
    console.log('Showing Add Personnel form');
  }

  public handleClickedRow(row: DisplayedPersonnel) {
    this.router.navigate([`/personnel/${row.id}`])
  }

  handlePage(pageEvent: PageEvent) {
    this.pageEventSubject_.next(pageEvent);
  }

}
