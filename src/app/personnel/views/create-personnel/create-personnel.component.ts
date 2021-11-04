import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Project } from 'src/app/project/models';
import { PersonnelActionTypes } from 'src/app/stores/personnel/actions';
import { IPersonnelState } from 'src/app/stores/personnel/state';
import { selectProjectList } from 'src/app/stores/project/selectors';
import { IProjectState } from 'src/app/stores/project/state';

import { CreatePersonnelRequest } from '../../models';
import { CreatePersonnelService } from './create-personnel.service';

@Component({
  selector: 'app-create-personnel',
  templateUrl: './create-personnel.component.html',
  styleUrls: ['./create-personnel.component.scss'],
  providers: [CreatePersonnelService],
})
export class CreatePersonnelComponent {

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

  projects$: Observable<Project[]> = this.projectStore.select(selectProjectList)

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreatePersonnelComponent>,
    private projectStore: Store<IProjectState>,
    private personnelStore: Store<IPersonnelState>,
  ) { }

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

      this.personnelStore.dispatch({ type: PersonnelActionTypes.CREATE_PERSONNEL, payload: createPersonnelRequest });
    }
  }

  public clearForm(): void {
    this.personnelForm.reset();
  }

}
