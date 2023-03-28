import { registerLocaleData } from '@angular/common';
import tr from '@angular/common/locales/tr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NzConfig } from 'ng-zorro-antd/core/config';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { lightTheme } from './theme';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { ENVIRONMENT } from './tokens/environment.token';
import { environment } from 'src/environments/environment.development';
import { NZ_I18N, tr_TR } from 'ng-zorro-antd/i18n';
import { NZ_CONFIG } from 'ng-zorro-antd/core/config';


registerLocaleData(tr);
const ngZorroConfig: NzConfig = {
  theme: lightTheme,
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
  ],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
      { provide: ENVIRONMENT, useValue: environment },
      { provide: NZ_I18N, useValue: tr_TR },
      { provide: NZ_CONFIG, useValue: ngZorroConfig },
      { provide: LOCALE_ID, useValue: 'tr' },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
