import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectDetailComponent } from './views/project-detail/project-detail.component';
import { ProjectDetailResolverService } from './views/project-detail/project-detail-resolver.service';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectDetailComponent,
    CreateProjectComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    CoreModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    ProjectDetailResolverService,
  ],
})
export class ProjectModule { }
