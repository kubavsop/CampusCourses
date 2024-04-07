import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {JwtService} from "../services/jwt.service";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = inject(JwtService);
  const token = jwtService.getToken();

  const request = req.clone({
    setHeaders: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  return next(request);
};
