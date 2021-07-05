import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './modal/modal.service';
import { IconModule } from './icon/icon.module';
import { MockMeetingDataService } from './interceptors/mock-meeting-data.service';

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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockMeetingDataService,
      multi: true
    }
  ]
})
export class CoreModule { }
