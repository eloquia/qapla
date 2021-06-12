import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { XComponent } from './x/x.component';
import { LeftArrowComponent } from './left-arrow/left-arrow.component';

@NgModule({
  declarations: [
    XComponent,
    LeftArrowComponent,
  ],
  exports: [
    XComponent,
    LeftArrowComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class IconModule { }
