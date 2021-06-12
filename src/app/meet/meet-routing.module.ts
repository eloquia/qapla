import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MeetDateComponent } from "./meet-date/meet-date.component";
import { MeetComponent } from "./meet.component";

const meetRoutes: Routes = [
  {
    path: '',
    component: MeetComponent,
    children: [
      {
        path: ':date',
        component: MeetDateComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(meetRoutes)],
  exports: [RouterModule]
})
export class MeetRoutingModule {}
