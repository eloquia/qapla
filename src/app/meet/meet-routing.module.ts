import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MeetDateComponent } from "./meet-date/meet-date.component";
import { MeetHomeComponent } from "./meet-home/meet-home.component";
import { MeetComponent } from "./meet.component";

const meetRoutes: Routes = [
  {
    path: '',
    component: MeetComponent,
    // children: [
    //   {
    //     path: 'home',
    //     component: MeetHomeComponent,
    //   },
    //   // {
    //   //   path: ':date',
    //   //   component: MeetDateComponent,
    //   // },
    //   {
    //     path: '',
    //     redirectTo: 'home',
    //     pathMatch: 'full',
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(meetRoutes)],
  exports: [RouterModule]
})
export class MeetRoutingModule {}
