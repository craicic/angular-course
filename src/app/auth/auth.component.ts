import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {AuthResponseModel} from './auth-response.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  authForm: FormGroup;
  isLoading = false;
  errorResponse: string = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit() {
    this.authForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    const submittedEmail: string = this.authForm.value.email;
    const submittedPassword: string = this.authForm.value.password;

    let authObs: Observable<AuthResponseModel>;

    this.errorResponse = null;
    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(submittedEmail, submittedPassword);
    } else {
      authObs = this.authService.signup(submittedEmail, submittedPassword);
    }
    authObs.subscribe(
      data => {
        console.log(data);
        this.isLoading = false;
        this.router.navigate(['./recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.errorResponse = errorMessage;
        this.isLoading = false;
      });
    this.authForm.reset();
  }

}
