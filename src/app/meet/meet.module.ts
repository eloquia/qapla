import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetComponent } from './meet.component';
import { MeetRoutingModule } from './meet-routing.module';

@NgModule({
  declarations: [
    MeetComponent
  ],
  imports: [
    CommonModule,
    MeetRoutingModule,
  ]
})
export class MeetModule { }
