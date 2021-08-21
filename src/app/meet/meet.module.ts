import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { FutureMeetingComponent } from './future-meeting/future-meeting.component';
import { PresentMeetingComponent } from './present-meeting/present-meeting.component';
import { PastMeetingComponent } from './past-meeting/past-meeting.component';
import { IconModule } from '../core/icon/icon.module';
import { AttendanceSelectorComponent } from './attendance-selector/attendance-selector.component';
import { PresentMeetingItemComponent } from './present-meeting/present-meeting-item/present-meeting-item.component';
import { CommonComponentsModule } from '../common/common.module';

@NgModule({
  declarations: [
    MeetComponent,
    CreateMeetingComponent,
    MeetDateComponent,
    DatePickerComponent,
    DatePickerDayComponent,
    CreateFreeFormMeetingComponent,
    CreateProjectMeetingComponent,
    CreateMeetingDirective,
    FutureMeetingComponent,
    PresentMeetingComponent,
    PastMeetingComponent,
    AttendanceSelectorComponent,
    PresentMeetingItemComponent,
  ],
  imports: [
    IconModule,
    CommonModule,
    CommonComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MeetRoutingModule,
  ],
  exports: [CommonComponentsModule, ReactiveFormsModule, HttpClientModule],
})
export class MeetModule {}
