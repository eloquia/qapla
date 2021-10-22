import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

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

  f = this.formBuilder.group({
    name: [''],
    notes: this.formBuilder.array([
      this.formBuilder.group({
        text: [''],
        tags: this.formBuilder.array([
          this.formBuilder.group({
            text: ['']
          })
        ])
      })
    ])
  })

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {}

  get notes(): FormArray {
    return this.f.get('notes') as FormArray;
  }

  noteTags(idx: number): FormArray {
    return this.notes.at(idx).get('tags') as FormArray;
  }
}
