import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PersonnelComponent } from "./personnel.component";
import { PersonnelDetailResolverService } from "./views/personnel-detail/personnel-detail-resolver.service";
import { PersonnelDetailComponent } from "./views/personnel-detail/personnel-detail.component";

const personnelRoutes: Routes = [
  {
    path: '',
    component: PersonnelComponent,
  },
  {
    path: ':id',
    component: PersonnelDetailComponent,
    resolve: {
      personnel: PersonnelDetailResolverService,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(personnelRoutes)],
  exports: [RouterModule]
})
export class PersonnelRoutingModule {}
