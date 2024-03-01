import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthService,
    private _NgToastService: NgToastService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}
  isloading: boolean = false;

  loginForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)],
    ],
  });

  handleLogin() {
    if (this.loginForm.valid) {
      this.isloading = true;
      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            this.isloading = false;
            this._NgToastService.success({
              detail: 'SUCCESS',
              summary: 'Registered Successfully',
              duration: 3000,
              position: 'topRight',
            });
            console.log(response);
            localStorage.setItem('etoken', response.token);
            this._AuthService.decodeUserData();
            this._Router.navigate(['/home']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isloading = false;
          console.log(err.error.message);
          this._NgToastService.error({
            detail: 'ERROR',
            summary: err.error.message,
            duration: 3000,
            sticky: true,
            position: 'botomCenter',
          });
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
