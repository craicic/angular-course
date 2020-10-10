import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthResponseModel} from './auth-response.model';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {UserModel} from './user.model';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<UserModel>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {

  }

  signup(emailArg: string, passwordArg: string): any {
    const payload = {
      email: emailArg,
      password: passwordArg,
      returnSecureToken: true
    };
    return this.http
      .post<AuthResponseModel>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.apiKey, payload)
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, responseData.expiresIn);
        })
      );
  }

  login(emailArg: string, passwordArg: string) {
    const payload = {
      email: emailArg,
      password: passwordArg,
      returnSecureToken: true
    };
    return this.http
      .post<AuthResponseModel>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.apiKey,
        payload)
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          console.log('res.expiredIn:' + responseData.expiresIn);
          this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, responseData.expiresIn);
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userDataAsString: string = localStorage.getItem('userData');
    if (userDataAsString) {
      const userDataAsJSON: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string
      } = JSON.parse(userDataAsString);
      const loadedUser = new UserModel(
        userDataAsJSON.email,
        userDataAsJSON.id,
        userDataAsJSON._token,
        new Date(userDataAsJSON._tokenExpirationDate));

      if (loadedUser.token) {
        this.user.next(loadedUser);
        const expirationDuration = new Date(userDataAsJSON._tokenExpirationDate).getTime()
        - new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: string) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const userObject = new UserModel(email, userId, token, expirationDate);
    this.user.next(userObject);
    this.autoLogout(+expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(userObject));
  }

  private handleError(errorRes: HttpErrorResponse): Observable<never> {
    console.log(errorRes);
    let errorMessage = 'An error has occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    } else {
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS' :
          errorMessage = 'The email address is already in use by another account.';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
          break;
        case 'EMAIL_NOT_FOUND' :
          errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'The password is invalid or the user does not have a password.';
          break;
        case 'USER_DISABLED':
          errorMessage = 'The user account has been disabled by an administrator.';
          break;
      }
      return throwError(errorMessage);
    }
  }
}
