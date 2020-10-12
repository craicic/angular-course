import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {exhaustMap, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authService.user.pipe(
      // tell the subscription to take ONLY ONE value, after this unsubscribe
      take(1),
      exhaustMap(user => {
        if (
          (req.url.includes('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=', 0) ||
            req.url.includes('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=', 0)) &&
          !user
        ) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
        return next.handle(modifiedReq);
      })
    );

  }


}
