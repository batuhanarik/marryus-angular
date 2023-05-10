import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { LoginInput, AuthResponse, RegisterInput } from '../models/auth.model';
import { AuthStore } from '../store/auth.store';
import { UserClaims } from '../models/userClaims';

@Injectable()
export class AuthService {
  claims: UserClaims;
  isAdmin: boolean = false;
  constructor(
    private _http: HttpClient,
    private _authState: AuthStore,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    if (this._authState.isAuthenticated()) {
      this.getClaims();
    }
  }

  handleTokenResponse = (res: AuthResponse) => {
    this._authState.setState(res);
    const returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    this._router.navigateByUrl(returnUrl);
    this.getClaims();
  };

  login(input: LoginInput) {
    return this._http
      .post<AuthResponse>('/Auth/login', input)
      .pipe(tap(this.handleTokenResponse));
  }
  logout(): void {
    localStorage.setItem('auth', 'null');
    this._router.navigate(['/auth/login']);
  }

  register(input: RegisterInput) {
    return this._http.post<AuthResponse>('/Auth/register', input);
    // .pipe(tap(this.handleTokenResponse));
  }

  private getToken() {
    return JSON.parse(localStorage.getItem('auth'))['token'].toString();
  }
  private getClaims() {
    let token = this.getToken();
    let tokenAttributes = this.getTokenAttributes(token);
    if (tokenAttributes) {
      let claims: UserClaims = {
        userId:
          tokenAttributes[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ],
        email: tokenAttributes['email'],
        fullName:
          tokenAttributes[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
          ],
        roles:
          tokenAttributes[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ],
      };
      this.claims = claims;
    }
  }

  private getTokenAttributes(token: string): any {
    if (token) {
      let tokenData = token.split('.')[1];
      return JSON.parse(
        decodeURIComponent(
          atob(tokenData)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        )
      );
    }
    return null;
  }
}
