import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  authForm: FormGroup;

  constructor(private authService: AuthService) {
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

    if (this.isLoginMode) {
      // ...
    } else {
      this.authService.signup(submittedEmail, submittedPassword).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }
    this.authForm.reset();
  }
}
