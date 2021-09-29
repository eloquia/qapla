import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { APP_ROUTES } from './app.routes';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'qapla-ui';

  showToolbar = false;
  showMenu = false;
  appRoutes = APP_ROUTES.filter(route => route.data && route.data.displayText);
  loggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    // this.router.events.pipe(
    //   tap(event => console.log('event', event))
    // ).subscribe();
  }
}
