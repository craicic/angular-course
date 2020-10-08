import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AuthService {
  private payload: any;
  constructor(private http: HttpClient) {

  }

  signup() {
    this.http.post<any> ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=', this.payload);
  }
}
