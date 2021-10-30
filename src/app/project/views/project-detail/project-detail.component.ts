import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PersonnelService } from 'src/app/personnel/personnel.service';
import { Project } from '../../models';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent {

  // unassignedPersonnel: Observable<Personnel[]> = this.personnelService.unassignedPersonnel$;
  personnelRemovalForm = this.formBuilder.group({
    removePersonnelArray: this.formBuilder.array([]),
  });

  // Every time project changes, update the personnel removal form
  project$: Observable<Project> = this.projectService.selectedProject$;
  subscription = this.projectService.selectedProject$.pipe(
    tap(newProject => {
      // fill out form--create a form control inside the array
      newProject.personnel

      if (newProject.personnel) {
        const fgArgs = newProject.personnel.map(() => {

          return this.formBuilder.group({
            remove: new FormControl(false),
          })
        });

        const fa = this.formBuilder.array(fgArgs);
        this.personnelRemovalForm.setControl('removePersonnelArray', fa)
      }
    })
  ).subscribe();

  assignPersonnelForm = this.formBuilder.group({
    personnels: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private personnelService: PersonnelService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
  ) { }

  public addPersonnel(): void {
    if (this.assignPersonnelForm.get('personnels')?.value) {
      const assignedPersonnelIDs = this.assignPersonnelForm.get('personnels')?.value;

      this.projectService.addProjectPersonnel(assignedPersonnelIDs);
    }
  }

  public get removePersonnelArray(): FormArray {
    return this.personnelRemovalForm.get('removePersonnelArray') as FormArray;
  }

  public removePersonnel(): void {
    const removalArray = this.personnelRemovalForm.get('removePersonnelArray')?.value;
    this.projectService.removeProjectPersonnel(removalArray);
  }

}
