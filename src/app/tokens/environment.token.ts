import { InjectionToken } from '@angular/core';

export interface Environment {
  apiUrl: string;
}

export const ENVIRONMENT = new InjectionToken<Environment>('ENVIRONMENT');
