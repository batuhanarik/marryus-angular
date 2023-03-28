import { Injectable } from '@angular/core';
import { createStore, setProps, withProps } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { LoginResponse } from '../models/login.model';

interface AuthProps {
  token: string | null;
  expiration: string | null;
}
const authStore = createStore(
  { name: 'auth' },
  withProps<AuthProps>({ token: null, expiration: null })
);

export const persist = persistState(authStore, {
  key: 'auth',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly store = authStore;

  setState(state: LoginResponse) {
    this.store.update(setProps(state));
  }

  isAuthenticated() {
    const { token, expiration } = this.store.query((s) => s);
    if (!token || !expiration) return false;

    const endDate = new Date(expiration).valueOf();
    const now = new Date().valueOf();

    return endDate > now;
  }
}
