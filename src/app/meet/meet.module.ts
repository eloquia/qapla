import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MeetComponent } from './meet.component';
import { MeetRoutingModule } from './meet-routing.module';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { MeetDateComponent } from './meet-date/meet-date.component';
import { MeetService } from './meet.service';
import { MeetDateResolverService } from './meet-date/meet-date-resolver.service';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DatePickerDayComponent } from './date-picker/date-picker-day/date-picker-day.component';

@NgModule({
  declarations: [
    MeetComponent,
    CreateMeetingComponent,
    MeetDateComponent,
    DatePickerComponent,
    DatePickerDayComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MeetRoutingModule,
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    MeetService,
    MeetDateResolverService,
  ]
})
export class MeetModule { }
