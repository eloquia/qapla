import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectService } from './project.service';

@NgModule({
  declarations: [
    ProjectComponent,
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
    ProjectService,
  ],
})
export class ProjectModule { }
