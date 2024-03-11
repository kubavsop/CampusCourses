import {HttpInterceptorFn} from '@angular/common/http';
import {catchError, EMPTY, throwError} from "rxjs";
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {showErrorPopup} from "../../shared/util/popup";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const router = inject(Router)
  return next(req)
    .pipe(
      catchError((err) => {
        if (err.status === 401) {
          showErrorPopup("Недействительный токен", err);
          router.navigate(["login"]);
          userService.purgeAuth();
          return EMPTY;
        }

        return throwError(() => err);
      }),
    );
};
