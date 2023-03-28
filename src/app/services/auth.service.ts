import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { LoginInput, LoginResponse } from '../models/login.model';
import { AuthStore } from '../store/auth.store';

@Injectable()
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _authState: AuthStore,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  handleTokenResponse = (res: LoginResponse) => {
    this._authState.setState(res);
    const returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    this._router.navigateByUrl(returnUrl);
  };

  login(input: LoginInput) {
    return this._http
      .post<LoginResponse>('/Auth/login', input)
      .pipe(tap(this.handleTokenResponse));
  }
}
