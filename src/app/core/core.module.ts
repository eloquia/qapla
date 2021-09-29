import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

import { MatLuxonDateModule } from 'ngx-material-luxon';

import { ToastrModule } from 'ngx-toastr';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { IconModule } from './icon/icon.module';

@NgModule({
  declarations: [
    ToolbarComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    IconModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatLuxonDateModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDialogModule,
    MatStepperModule,
    MatSelectModule,
    MatRadioModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  exports: [
    ToolbarComponent,
    NotFoundComponent,
    IconModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatLuxonDateModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDialogModule,
    MatStepperModule,
    MatSelectModule,
    MatRadioModule,
  ],
})
export class CoreModule { }
