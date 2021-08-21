import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditableInputComponent } from './editable-input/editable-input.component';
import { DynamicListComponent } from './dynamic-list/dynamic-list.component';
import { IconModule } from '../core/icon/icon.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchbarDropdownComponent } from './searchbar-dropdown/searchbar-dropdown.component';

@NgModule({
  declarations: [
    EditableInputComponent,
    DynamicListComponent,
    SearchbarDropdownComponent,
  ],
  imports: [ReactiveFormsModule, CommonModule, IconModule],
  exports: [
    EditableInputComponent,
    DynamicListComponent,
    SearchbarDropdownComponent,
    IconModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class CommonComponentsModule {}
