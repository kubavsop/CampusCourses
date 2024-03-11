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


export const appConfig: ApplicationConfig = {
  providers: [
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
