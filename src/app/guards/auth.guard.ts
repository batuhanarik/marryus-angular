import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthStore } from '../store/auth.store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authStore: AuthStore, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authStore.isAuthenticated()) {
      return true;
    }

    return this.router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: this.router.url },
    });
  }
}
