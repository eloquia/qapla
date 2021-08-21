import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../auth.service';
import { SuccessToastConfig } from '../core/models';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  loading = false;
  submitted = false;
  returnUrl: string = this.route.snapshot.queryParams['returnUrl'] || '/';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private toasterService: ToastrService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {}

  togglePasswordVisibility() {
    
  }

  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (!this.email || !this.password) {
      console.log(`Invalid email: ${this.email} or password: ${this.password}`)
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.email, this.password)
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
