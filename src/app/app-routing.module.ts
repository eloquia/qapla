import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'project',
    loadChildren: () => import('./project/project.module').then(m => m.ProjectModule)
  },
  {
    path: 'personnel',
    loadChildren: () => import('./personnel/personnel.module').then(m => m.PersonnelModule)
  },
  {
    path: 'meet',
    loadChildren: () => import('./meet/meet.module').then(m => m.MeetModule)
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
