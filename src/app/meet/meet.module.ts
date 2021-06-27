import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MeetComponent } from './meet.component';
import { MeetRoutingModule } from './meet-routing.module';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { MeetDateComponent } from './meet-date/meet-date.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DatePickerDayComponent } from './date-picker/date-picker-day/date-picker-day.component';
import { CreateFreeFormMeetingComponent } from './create-meeting/create-free-form-meeting/create-free-form-meeting.component';
import { CreateProjectMeetingComponent } from './create-meeting/create-project-meeting/create-project-meeting.component';
import { CreateMeetingDirective } from './create-meeting/create-meeting.directive';

@NgModule({
  declarations: [
    MeetComponent,
    CreateMeetingComponent,
    MeetDateComponent,
    DatePickerComponent,
    DatePickerDayComponent,
    CreateFreeFormMeetingComponent,
    CreateProjectMeetingComponent,
    CreateMeetingDirective
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
})
export class MeetModule { }
