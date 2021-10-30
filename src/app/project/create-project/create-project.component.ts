import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ProjectActionTypes } from 'src/app/stores/project/actions';
import { IProjectState } from 'src/app/stores/project/state';
import { CreateProjectRequest } from '../models';

import { CreateProjectService } from './create-project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  providers: [CreateProjectService],
})
export class CreateProjectComponent {

  isSameName = false;

  projectForm = this.formBuilder.group({
    name: [''],
    description: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateProjectComponent>,
    private store: Store<IProjectState>,
  ) { }

  public createProject() {
    const createProjectRequest: CreateProjectRequest = {
      name: this.projectForm.get('name')?.value,
      description: this.projectForm.get('description')?.value,
    }
    this.store.dispatch({ type: ProjectActionTypes.CREATE_PROJECT, createProjectRequest });
  }

}
