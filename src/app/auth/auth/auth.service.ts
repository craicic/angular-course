import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
  private payload: any;
  constructor(private http: HttpClient) {

  }

  signup() {
    this.http.post<any> ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.apiKey, this.payload);
  }
}
