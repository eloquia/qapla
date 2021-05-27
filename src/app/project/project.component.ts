import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Project } from './models';

import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projectForm = this.formBuilder.group({
    name: [''],
    description: [''],
  });

  projects: Project[] = [];
  showForm: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.fetchProjects();
  }

  public toggleShowForm(): void {
    this.showForm = !this.showForm;
  }

  public createProject(): void {
    this.projectService.createProject({
      name: this.projectForm.get('name')?.value,
      description: this.projectForm.get('description')?.value,
    }).subscribe(response => {
      console.log('response', response)
    });
  }

  public fetchProjects() {
    return this.projectService.getAllProjects().subscribe((data: any) => {
      this.projects = data;
    });
  }

  public deleteProject(id: number) {
    this.projectService.deleteProjectById(id).subscribe(resp => {
      console.log(`delete response ${resp}`)
    });
    // this.projectService.getAllProjects();
  }

}
