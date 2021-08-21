import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './core/home/home.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'project',
    loadChildren: () =>
      import('./project/project.module').then((m) => m.ProjectModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'personnel',
    loadChildren: () =>
      import('./personnel/personnel.module').then((m) => m.PersonnelModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'meet',
    loadChildren: () => import('./meet/meet.module').then((m) => m.MeetModule),
    // canActivate: [AuthGuard],
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
