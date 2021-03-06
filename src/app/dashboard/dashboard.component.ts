import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { DASHBOARD_ROUTES } from './dashboard.routes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  routes: Routes = DASHBOARD_ROUTES[0].children!;

  constructor() { }

}
