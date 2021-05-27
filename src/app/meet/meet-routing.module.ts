import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MeetComponent } from "./meet.component";

const meetRoutes: Routes = [
  {
    path: '',
    component: MeetComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(meetRoutes)],
  exports: [RouterModule]
})
export class MeetRoutingModule {}
