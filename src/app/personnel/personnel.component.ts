import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { PersonnelActionTypes } from '../stores/personnel/actions';
import { selectPersonnelList } from '../stores/personnel/selectors';
import { IPersonnelState } from '../stores/personnel/state';

import { DisplayedPersonnel, Personnel, PersonnelListItem } from './models';
import { PersonnelService } from './personnel.service';
import { CreatePersonnelComponent } from './views/create-personnel/create-personnel.component';

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
  personnelList$: Observable<PersonnelListItem[]> = this.store.select(selectPersonnelList)
    .pipe(
      map<Personnel[], PersonnelListItem[]>(personnelList => {
        return !!personnelList && personnelList.length
        ? personnelList.map(p => {
            return {
              id: p.id,
              name: `${p.firstName} ${p.lastName}`,
              projectNames: p.assignedProjects ? p.assignedProjects.map(ap => ap.name) : ['Unassigned'],
            }
          })
        : []
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
    public dialog: MatDialog,
    private personnelService: PersonnelService,
    private router: Router,
    private store: Store<IPersonnelState>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch({ type: PersonnelActionTypes.GET_PERSONNEL_LIST })
  }

  public showForm(): void {
    const dialogRef = this.dialog.open(CreatePersonnelComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('dispatched PersonnelActionTypes.GET_PERSONNEL_LIST')
      this.store.dispatch({ type: PersonnelActionTypes.GET_PERSONNEL_LIST })
    });
  }

  public handleClickedRow(row: DisplayedPersonnel) {
    this.router.navigate([`/personnel/${row.id}`])
  }

  handlePage(pageEvent: PageEvent) {
    this.pageEventSubject_.next(pageEvent);
  }

}
