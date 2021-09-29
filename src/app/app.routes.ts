import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'project',
    loadChildren: () =>
      import('./project/project.module').then((m) => m.ProjectModule),
    // canActivate: [AuthGuard],
    data: {
      displayText: 'Projects',
    },
  },
  {
    path: 'personnel',
    loadChildren: () =>
      import('./personnel/personnel.module').then((m) => m.PersonnelModule),
    // canActivate: [AuthGuard],
    data: {
      displayText: 'Personnel',
    },
  },
  {
    path: 'meet',
    loadChildren: () => import('./meet/meet.module').then((m) => m.MeetModule),
    // canActivate: [AuthGuard],
    data: {
      displayText: 'Meetings',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
