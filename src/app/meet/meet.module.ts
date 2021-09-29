import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MeetComponent } from './meet.component';
import { MeetRoutingModule } from './meet-routing.module';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { MeetDateComponent } from './meet-date/meet-date.component';
import { CreatePeopleMeetingComponent } from './create-meeting/create-people-meeting/create-people-meeting.component';
import { CreateProjectMeetingComponent } from './create-meeting/create-project-meeting/create-project-meeting.component';
import { CreateMeetingDirective } from './create-meeting/create-meeting.directive';
import { PresentMeetingComponent } from './present-meeting/present-meeting.component';
import { IconModule } from '../core/icon/icon.module';
import { AttendanceSelectorComponent } from './attendance-selector/attendance-selector.component';
import { PresentMeetingItemComponent } from './present-meeting/present-meeting-item/present-meeting-item.component';
import { CommonComponentsModule } from '../common/common.module';
import { CoreModule } from '../core/core.module';
import { EditableMeetingComponent } from './editable-meeting/editable-meeting.component';
import { CreateMeetingTypeComponent } from './create-meeting-type/create-meeting-type.component';
import { MeetHomeComponent } from './meet-home/meet-home.component';
import { NoteTagComponent } from './note-tag/note-tag.component';

@NgModule({
  declarations: [
    MeetComponent,
    MeetDateComponent,
    CreatePeopleMeetingComponent,
    CreateProjectMeetingComponent,
    CreateMeetingDirective,
    PresentMeetingComponent,
    AttendanceSelectorComponent,
    PresentMeetingItemComponent,
    EditableMeetingComponent,
    CreateMeetingComponent,
    CreateMeetingTypeComponent,
    MeetHomeComponent,
    NoteTagComponent,
  ],
  imports: [
    CoreModule,
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
