import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DisplayedPersonnel, UpdatePersonnelRequest } from '../../models';
import { PersonnelService } from '../../personnel.service';

@Component({
  selector: 'app-personnel-detail',
  templateUrl: './personnel-detail.component.html',
  styleUrls: ['./personnel-detail.component.scss']
})
export class PersonnelDetailComponent implements OnInit {

  personnel$: Observable<DisplayedPersonnel> = this.personnelService.selectedPersonnel$.pipe(
    tap(personnel => {
      this.personnelOverviewForm.setControl('firstName', new FormControl(personnel.firstName));
      this.personnelOverviewForm.setControl('lastName', new FormControl(personnel.lastName));
      this.personnelOverviewForm.setControl('goesBy', new FormControl(personnel.goesBy));
      this.personnelOverviewForm.setControl('middleName', new FormControl(personnel.middleName));
      this.personnelOverviewForm.setControl('email', new FormControl(personnel.email));
      this.personnelDemographicsForm.setControl('gender', new FormControl(personnel.gender));
      this.personnelDemographicsForm.setControl('position', new FormControl(personnel.position));
      this.personnelDemographicsForm.setControl('institution', new FormControl(personnel.institution));

      this.personnelOverviewForm.setControl('isActive', new FormControl(personnel.isActive));
    })
  );

  personnelOverviewForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    goesBy: [''],
    middleName: [''],
    email: [''],
    isActive: [''],
  });

  personnelDemographicsForm = this.formBuilder.group({
    gender: [''],
    ethnicity: [''],
    position: [''],
    institution: [''],
  })

  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personnelService: PersonnelService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.route.data
      .subscribe(data => {
        const personnel = data.personnel;
        this.id = personnel.id;

        this.personnelService.setFocusedPersonnel(personnel);
      });
  }

  backToPersonnel(): void {
    this.router.navigate(['personnel'])
  }

  public focusout(input?: any): void {
    console.log('focusout', input)
  }

  public handleAddGoal(text: string, type: string) {
    this.personnelService.addPersonnelGoal({
      text,
      type
    })
  }
  public handleRemoveGoal(goalId: number) {
    this.personnelService.removePersonnelGoalById(goalId)
  }
  public handleAddExperience(text: string, type: string) {
    this.personnelService.addPersonnelExperience({
      text,
      type
    })
  }
  public handleRemoveExperience(experienceId: number) {
    this.personnelService.removePersonnelExperienceById(experienceId)
  }
  public handleAddLike(text: string, type: string) {
    this.personnelService.addPersonnelLike({
      text,
      type
    })
  }
  public handleRemoveLike(likeId: number) {
    this.personnelService.removePersonnelLikeById(likeId)
  }

  public updatePersonnel(): void {
    // create the updateRequest from from values
    const updatePersonnelRequest: UpdatePersonnelRequest = {
      id: this.id,
      firstName: this.personnelOverviewForm.get('firstName')?.value,
      lastName: this.personnelOverviewForm.get('lastName')?.value,
      middleName: this.personnelOverviewForm.get('middleName')?.value,
      goesBy: this.personnelOverviewForm.get('goesBy')?.value,
      email: this.personnelOverviewForm.get('email')?.value,
      gender: this.personnelDemographicsForm.get('gender')?.value,
      ethnicity: this.personnelDemographicsForm.get('ethnicity')?.value,
      position: this.personnelDemographicsForm.get('position')?.value,
      institution: this.personnelDemographicsForm.get('institution')?.value,
      isActive: this.personnelOverviewForm.get('isActive')?.value,
    };
    this.personnelService.updatePersonnel(updatePersonnelRequest);
  }

  public setActivity(isActive: boolean): void {
    console.log('setting activity status', isActive);
    this.personnelService.setActivity(isActive);
    // this.editPersonnelForm.get('isActive')?.setValue(isActive);
  }

}
