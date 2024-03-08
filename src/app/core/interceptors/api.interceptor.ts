import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({ url: `https://camp-courses.api.kreosoft.space${req.url}` });
  return next(apiReq);
};
