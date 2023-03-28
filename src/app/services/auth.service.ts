import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { LoginInput, AuthResponse, RegisterInput } from '../models/auth.model';
import { AuthStore } from '../store/auth.store';

@Injectable()
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _authState: AuthStore,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  handleTokenResponse = (res: AuthResponse) => {
    this._authState.setState(res);
    const returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    this._router.navigateByUrl(returnUrl);
  };

  login(input: LoginInput) {
    return this._http
      .post<AuthResponse>('/Auth/login', input)
      .pipe(tap(this.handleTokenResponse));
  }

  register(input: RegisterInput) {
    return this._http
      .post<AuthResponse>('/Auth/register', input)
      // .pipe(tap(this.handleTokenResponse));
  }
}
