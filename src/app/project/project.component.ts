import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateProjectMeetingComponent } from '../meet/create-meeting/create-project-meeting/create-project-meeting.component';

import { Project } from './models';
import { ProjectService } from './project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [DialogService],
})
export class ProjectComponent implements OnInit {

  projects$: Observable<Project[]> = this.projectService.projects$;

  constructor(
    private projectService: ProjectService,
    private dialogService: DialogService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchProjects();
  }

  public fetchProjects() {
    return this.projectService.getAllProjects();
  }

  public goToProject(slug: any) {
    console.log('Going to project', slug)
    this.router.navigate([`/project/${slug}`])
  }

  public deleteProject(id: number, name: string) {
    this.projectService.deleteProjectById(id, name);
  }

  public showCreate() {
    this.dialogService.open(CreateProjectMeetingComponent, {
      header: 'Create a Project',
      width: '70%'
    });
  }

}
