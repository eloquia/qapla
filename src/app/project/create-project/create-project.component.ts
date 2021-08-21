import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ProjectService } from '../project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  projectForm = this.formBuilder.group({
    name: [''],
    description: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
  }

  public createProject(): void {
    this.projectService.createProject({
      name: this.projectForm.get('name')?.value,
      description: this.projectForm.get('description')?.value,
    });
  }

}
