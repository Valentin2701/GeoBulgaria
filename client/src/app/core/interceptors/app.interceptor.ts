import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export const appInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  if (request.url.startsWith('/api')) {
    request = request.clone({
      url: request.url.replace('/api', environment.API_URL),
      withCredentials: true,
    });
  }
  
  return next(request);
};