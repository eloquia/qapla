import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Project } from 'src/app/project/models';
import { ProjectService } from 'src/app/project/project.service';

import { CreatePersonnelRequest } from '../../models';
import { PersonnelService } from '../../personnel.service';
import { CreatePersonnelService } from './create-personnel.service';

@Component({
  selector: 'app-create-personnel',
  templateUrl: './create-personnel.component.html',
  styleUrls: ['./create-personnel.component.scss'],
  providers: [CreatePersonnelService],
})
export class CreatePersonnelComponent implements OnInit {

  emailInUse = false;

  showErrors: boolean = false;
  personnelForm = this.formBuilder.group({
    firstName: ['', [ Validators.required ]],
    lastName: ['', [ Validators.required ]],
    goesBy: [''],
    middleName: [''],
    email: ['', [ Validators.required ]],
    gender: [''],
    ethnicity: [''],
    position: [''],
    institution: [''],
    assignedProjects: [''],
  });

  projects$: Observable<Project[]> = this.projectService.projects$;

  constructor(
    private formBuilder: FormBuilder,
    private personnelService: PersonnelService,
    private projectService: ProjectService,
    private createPersonnelService: CreatePersonnelService,
    public dialogRef: MatDialogRef<CreatePersonnelComponent>,
  ) { }

  ngOnInit(): void {
  }

  public createPersonnel(): void {
    if (this.personnelForm.invalid) {
      this.showErrors = true;
      console.log('errors in form!', this.personnelForm)
    } else {
      this.showErrors = false;
      const createPersonnelRequest: CreatePersonnelRequest = {
        // required properties
        firstName: this.personnelForm.get('firstName')?.value,
        lastName: this.personnelForm.get('lastName')?.value,

        // optional properties
        email: this.personnelForm.get('email')?.value ? this.personnelForm.get('email')?.value : '',
        middleName: this.personnelForm.get('middleName')?.value ? this.personnelForm.get('middleName')?.value : '',
        goesBy: this.personnelForm.get('goesBy')?.value ? this.personnelForm.get('goesBy')?.value : '',
        gender: this.personnelForm.get('gender')?.value ? this.personnelForm.get('gender')?.value : '',
        ethnicity: this.personnelForm.get('ethnicity')?.value ? this.personnelForm.get('ethnicity')?.value : '',
        position: this.personnelForm.get('position')?.value ? this.personnelForm.get('position')?.value : '',
        institution: this.personnelForm.get('institution')?.value ? this.personnelForm.get('institution')?.value : '',
        assignedProjectIDs: this.personnelForm.get('assignedProjects')?.value ? this.personnelForm.get('assignedProjects')?.value : [],
      }
      // this.personnelService.createPersonnel(createPersonnelRequest).subscribe(response => {
      //   this.clearForm();
      // });
      this.createPersonnelService.createPersonnel(createPersonnelRequest).subscribe({
        next: r => {
          console.log('User created successfully', r);
          this.emailInUse = false;
          this.dialogRef.close();
        },
        error: e => {
          console.warn(e)
          if (e.message === 'Email already in use') {
            this.emailInUse = true;
          }
        },
      })
    }
  }

  public clearForm(): void {
    this.personnelForm.reset();
  }

}
