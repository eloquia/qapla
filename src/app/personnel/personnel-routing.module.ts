import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PersonnelComponent } from "./personnel.component";

const personnelRoutes: Routes = [
  {
    path: '',
    component: PersonnelComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(personnelRoutes)],
  exports: [RouterModule]
})
export class PersonnelRoutingModule {}
