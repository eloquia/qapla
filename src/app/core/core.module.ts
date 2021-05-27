import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    NotFoundComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToolbarComponent,
    NotFoundComponent,
    HomeComponent,
  ]
})
export class CoreModule { }
