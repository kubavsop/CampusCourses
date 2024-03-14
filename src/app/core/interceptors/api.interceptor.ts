import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {LoadingService} from "../services/loading.service";
import {finalize} from "rxjs";

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.startLoading();
  const apiReq = req.clone({ url: `https://camp-courses.api.kreosoft.space${req.url}` });
  return next(apiReq)
    .pipe(
      finalize(() => loadingService.stopLoading())
    );
};
