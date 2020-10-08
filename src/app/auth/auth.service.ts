import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthResponseDataModel} from './auth-response-data.model';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  signup(emailArg: string, passwordArg: string): any {
    const payload = {
      email: emailArg,
      password: passwordArg,
      returnSecureToken: true
    };
    return this.http.post<AuthResponseDataModel>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.apiKey, payload);
  }
}
