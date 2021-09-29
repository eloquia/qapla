import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Project } from './models';
import { ProjectService } from './project.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

interface DisplayedProject {
  name: string;
  numPersonnel: number;
  slug: string;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {

  displayedColumns: string[] = ['name', 'numPersonnel']

  projects$: Observable<DisplayedProject[]> = this.projectService.projects$
    .pipe(
      map<Project[], DisplayedProject[]>(projects => projects.map(project => {
        return {
          name: project.name,
          slug: project.slug ? project.slug : '',
          numPersonnel: project.assignedPersonnel ? project.assignedPersonnel.length : 0,
        }
      }))
    );

  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.projectService.getAllProjects();
  }

  public showCreate() {
  }

  public handleClickedRow(row: DisplayedProject) {
    this.router.navigate([`/project/${row.slug}`])
  }

}
