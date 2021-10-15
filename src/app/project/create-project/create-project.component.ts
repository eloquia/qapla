import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateProjectRequest } from '../models';

import { ProjectService } from '../project.service';
import { CreateProjectService } from './create-project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  providers: [CreateProjectService],
})
export class CreateProjectComponent implements OnInit {

  isSameName = false;

  projectForm = this.formBuilder.group({
    name: [''],
    description: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<CreateProjectComponent>,
    private createProjectService: CreateProjectService,
  ) { }

  ngOnInit(): void {
  }

  public createProject() {
    const createProjectRequest: CreateProjectRequest = {
      name: this.projectForm.get('name')?.value,
      description: this.projectForm.get('description')?.value,
    }
    this.createProjectService.createProject(createProjectRequest)
    .subscribe({
      next: r => {
        this.dialogRef.close()
        this.isSameName = false;
      },
      error: e => {
        console.warn(e)
        if (e.message === 'Project with name already exists') {
          this.isSameName = true;
        }
      },
    });
  }

}
