import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder,
    private _MessageService: MessageService
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
            this._MessageService.add({
              severity: 'success',
              detail: 'login Successfully',
            });
            localStorage.setItem('etoken', response.token);
            this._AuthService.decodeUserData();
            this._Router.navigate(['/home']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isloading = false;
          this._MessageService.add({
            severity: 'error',
            detail: err.error.message,
          });
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
