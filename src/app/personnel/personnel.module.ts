import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PersonnelComponent } from './personnel.component';
import { PersonnelRoutingModule } from './personnel-routing.module';
import { PersonnelService } from './personnel.service';

@NgModule({
  declarations: [
    PersonnelComponent
  ],
  imports: [
    CommonModule,
    PersonnelRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    PersonnelService,
  ],
})
export class PersonnelModule { }
