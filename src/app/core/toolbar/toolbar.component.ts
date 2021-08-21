import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  items: MenuItem[] = [
    {
      label: 'Projects',
      icon: 'pi pi-briefcase',
      routerLink: ['/project'],
    },
    {
      label: 'Personnel',
      icon: 'pi pi-user',
      routerLink: ['/personnel'],
    },
    {
      label: 'Meetings',
      icon: 'pi pi-users',
      routerLink: ['/meet'],
    },
  ]

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  public nav(route: any): void {
    this.router.navigate([route]);
  }

  public logOut(): void {
    this.authService.logout();
  }
}
