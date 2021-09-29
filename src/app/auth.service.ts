import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { LoginResponse } from './models';
import { ProfileService } from './profile.service';
import { SuccessToastConfig } from './core/models';

export interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSubject_: BehaviorSubject<string>;
  public token$: Observable<string>;

  private userSubject_: BehaviorSubject<string | null>;
  public user$: Observable<string | null>;

  private isLoggedInSubject_: Subject<boolean> = new BehaviorSubject<boolean>(true);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject_.asObservable();
  private userId: number = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
    private profileService: ProfileService,
    private toasterService: ToastrService,
  ) {
    const existingToken: string | null = sessionStorage.getItem('token');
    const behaviorArgs = existingToken ? existingToken : '';

    this.tokenSubject_ = new BehaviorSubject<string>(behaviorArgs);
    this.token$ = this.tokenSubject_.asObservable();

    this.userSubject_ = new BehaviorSubject<string | null>(
      sessionStorage.getItem('user')
    );
    this.user$ = this.userSubject_.asObservable();
  }

  public get userValue(): string {
    return this.tokenSubject_.value;
  }

  public getUserId(): number {
    return this.userId;
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`http://localhost:8080/authenticate`, {
        email: credentials.email,
        password: credentials.password,
      })
      .pipe(
        map((loginResponse: LoginResponse) => {
          // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
          loginResponse.authdata = window.btoa(credentials.email + ':' + credentials.password);
          sessionStorage.setItem('token', JSON.stringify(loginResponse));
          sessionStorage.setItem('user', JSON.stringify(loginResponse));

          this.profileService.setProfile({
            id: loginResponse.userId,
            email: loginResponse.email,
          });

          this.userSubject_.next(loginResponse.toString());
          this.isLoggedInSubject_.next(true);
          return loginResponse;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    this.isLoggedInSubject_.next(false);
    sessionStorage.removeItem('token');
    this.tokenSubject_.next('');
    this.router.navigate(['/login']);
    this.toasterService.success(
      `Successfully logged out!`,
      `Success`,
      SuccessToastConfig,
    );
  }

  public userSubjectValue(): boolean {
    return this.userSubject_.observed;
  }

  public isAuthenticated(): boolean {
    const user = sessionStorage.getItem('user');
    if (!user) {
      return false;
    }
    const parsed = JSON.parse(user);
    console.log('sessionStore\'d user:', parsed)
    return !!user;
  }
}
