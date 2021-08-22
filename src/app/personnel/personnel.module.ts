import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PersonnelComponent } from './personnel.component';
import { PersonnelRoutingModule } from './personnel-routing.module';
import { PersonnelActivityComponent } from './views/personnel-activity/personnel-activity.component';
import { PersonnelDetailComponent } from './views/personnel-detail/personnel-detail.component';
import { PersonnelDetailResolverService } from './views/personnel-detail/personnel-detail-resolver.service';
import { CommonComponentsModule } from '../common/common.module';
import { CreatePersonnelComponent } from './views/create-personnel/create-personnel.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    PersonnelComponent,
    PersonnelActivityComponent,
    PersonnelDetailComponent,
    CreatePersonnelComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    PersonnelRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonComponentsModule,
  ],
  exports: [
    CoreModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonComponentsModule,
  ],
  providers: [
    PersonnelDetailResolverService,
  ],
  entryComponents: [
    CreatePersonnelComponent,
  ]
})
export class PersonnelModule { }
