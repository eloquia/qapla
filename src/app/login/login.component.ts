import { Component, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService, LoginCredentials } from '../auth.service';
import { SuccessToastConfig } from '../core/models';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    email: [''],
    password: ['']
  });

  @HostListener('keyup', ['$event'])
  async onEnter(e: any) {
    if (e.code === 'Enter') {
      await this.logIn();
    }
  }

  loading = false;
  returnUrl: string = this.route.snapshot.queryParams['returnUrl'] || '/';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private toasterService: ToastrService,
    private formBuilder: FormBuilder,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  async logIn() {
    this.loading = true;

    // stop here if form is invalid
    if (!this.loginForm.controls.email || !this.loginForm.controls.password) {
      console.log(`Invalid email: ${this.loginForm.controls.email} or password: ${this.loginForm.controls.password}`)
      return;
    }

    const credentials: LoginCredentials = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    }

    this.authenticationService
      .login(credentials)
      .subscribe({
        next: async () => {
          this.errorMessage = '';
          this.loading = false;
          await this.router.navigate([this.returnUrl]);
          this.toasterService.success(
            `Login Successful`,
            `Success`,
            SuccessToastConfig,
          );
        },
        error: (error: any) => {
          console.warn('error', error);
          this.errorMessage = 'Invalid credentials';
          this.loading = false;

          this.router.navigate([this.returnUrl]);
        },
      });
  }
}
