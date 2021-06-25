import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditableInputComponent } from './editable-input/editable-input.component';
import { DynamicListComponent } from './dynamic-list/dynamic-list.component';
import { IconModule } from '../core/icon/icon.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditableInputComponent,
    DynamicListComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    IconModule,
  ],
  exports: [
    EditableInputComponent,
    DynamicListComponent,
    IconModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class CommonComponentsModule { }
