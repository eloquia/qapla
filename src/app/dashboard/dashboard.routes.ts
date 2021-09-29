import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'home',
    component: DashboardComponent,
  },
  {
    path: 'project',
    loadChildren: () =>
      import('../project/project.module').then((m) => m.ProjectModule),
    // canActivate: [AuthGuard],
    data: {
      displayText: 'Projects',
    },
  },
  {
    path: 'personnel',
    loadChildren: () =>
      import('../personnel/personnel.module').then((m) => m.PersonnelModule),
    // canActivate: [AuthGuard],
    data: {
      displayText: 'Personnel',
    },
  },
  {
    path: 'meet',
    loadChildren: () => import('../meet/meet.module').then((m) => m.MeetModule),
    // canActivate: [AuthGuard],
    data: {
      displayText: 'Meetings',
    },
  },
  {
    path: '*',
    redirectTo: '',
    pathMatch: 'full',
  }
];
