import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { XComponent } from './x/x.component';
import { LeftArrowComponent } from './left-arrow/left-arrow.component';
import { PlusCircleComponent } from './plus-circle/plus-circle.component';
import { ChevronDownComponent } from './chevron-down/chevron-down.component';
import { ChevronRightComponent } from './chevron-right/chevron-right.component';

@NgModule({
  declarations: [
    XComponent,
    LeftArrowComponent,
    PlusCircleComponent,
    ChevronDownComponent,
    ChevronRightComponent,
  ],
  exports: [
    XComponent,
    LeftArrowComponent,
    PlusCircleComponent,
    ChevronDownComponent,
    ChevronRightComponent,
    CommonModule,
  ],
  imports: [
    CommonModule
  ]
})
export class IconModule { }
