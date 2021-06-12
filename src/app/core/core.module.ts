import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './modal/modal.service';
import { IconModule } from './icon/icon.module';

@NgModule({
  declarations: [
    ToolbarComponent,
    NotFoundComponent,
    HomeComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    IconModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  exports: [
    ToolbarComponent,
    NotFoundComponent,
    HomeComponent,
    ModalComponent,
    IconModule,
  ],
  providers: [
    ModalService,
  ]
})
export class CoreModule { }
