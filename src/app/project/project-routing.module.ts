import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProjectComponent } from "./project.component";
import { ProjectDetailResolverService } from "./views/project-detail/project-detail-resolver.service";
import { ProjectDetailComponent } from "./views/project-detail/project-detail.component";

const projectRoutes: Routes = [
  {
    path: '',
    component: ProjectComponent,
  },
  {
    path: ':slug',
    component: ProjectDetailComponent,
    resolve: {
      project: ProjectDetailResolverService,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(projectRoutes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
