import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {

  constructor(private router: Router, private authService: AuthService) {}

  public nav(route: any): void {
    this.router.navigate([route]);
  }

  public logOut(): void {
    this.authService.logout();
  }

  public goHome(): void {
    this.router.navigate(['']);
  }
}
