import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProjectComponent } from "./project.component";

const projectRoutes: Routes = [
  {
    path: '',
    component: ProjectComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(projectRoutes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
