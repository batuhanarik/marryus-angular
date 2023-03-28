import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment, ENVIRONMENT } from '../tokens/environment.token';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(@Inject(ENVIRONMENT) private _environment: Environment) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clone = req.clone({
      url: req.url.includes('https://localhost:44376')
        ? req.url
        : `${this._environment.apiUrl}${req.url}`,
    });

    return next.handle(clone);
  }
}
