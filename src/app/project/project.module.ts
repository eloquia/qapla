import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectDetailComponent } from './views/project-detail/project-detail.component';
import { ProjectDetailResolverService } from './views/project-detail/project-detail-resolver.service';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectDetailComponent,
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    ProjectDetailResolverService,
  ],
})
export class ProjectModule { }
