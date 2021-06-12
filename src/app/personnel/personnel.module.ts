import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PersonnelComponent } from './personnel.component';
import { PersonnelRoutingModule } from './personnel-routing.module';
import { PersonnelService } from './personnel.service';
import { PersonnelActivityComponent } from './views/personnel-activity/personnel-activity.component';
import { PersonnelDetailComponent } from './views/personnel-detail/personnel-detail.component';
import { PersonnelDetailResolverService } from './views/personnel-detail/personnel-detail-resolver.service';

import { ProjectService } from '../project/project.service';

@NgModule({
  declarations: [
    PersonnelComponent,
    PersonnelActivityComponent,
    PersonnelDetailComponent,
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
    ProjectService,
    PersonnelDetailResolverService,
  ],
})
export class PersonnelModule { }
