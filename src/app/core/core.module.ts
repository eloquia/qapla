import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';

import { ToastrModule } from 'ngx-toastr';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { IconModule } from './icon/icon.module';

@NgModule({
  declarations: [
    ToolbarComponent,
    NotFoundComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    IconModule,
    MenubarModule,
    CardModule,
    ButtonModule,
    DynamicDialogModule,
    TableModule,
    PanelModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  exports: [
    ToolbarComponent,
    NotFoundComponent,
    HomeComponent,
    IconModule,
    MenubarModule,
    CardModule,
    ButtonModule,
    DynamicDialogModule,
    TableModule,
    PanelModule,
  ],
  providers: []
})
export class CoreModule { }
