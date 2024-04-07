import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {apiInterceptor} from "./core/interceptors/api.interceptor";
import {tokenInterceptor} from "./core/interceptors/token.interceptor";
import {UserService} from "./core/services/user.service";
import {combineLatest, EMPTY, Observable} from "rxjs";
import {JwtService} from "./core/services/jwt.service";
import {errorInterceptor} from "./core/interceptors/error.interceptor";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

function initializeAppFactory(userService: UserService, jwtService: JwtService): () => Observable<any> {
  return () => {
    if (jwtService.getToken()) {
      return combineLatest([
        userService.getProfile(),
        userService.getRoles()
      ]);
    } else {
      return EMPTY;
    }
  };
}

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      multi: true,
      deps: [UserService, JwtService],
    },
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([apiInterceptor, tokenInterceptor, errorInterceptor])),
  ]
};
