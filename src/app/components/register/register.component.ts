import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private _AuthService: AuthService,
    private _NgToastService: NgToastService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}

  isloading: boolean = false;

  registerForm: FormGroup = this._FormBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)],
    ],
    rePassword: [
      '',
      [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)],
    ],

    phone: [
      '',
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
  });

  handleForm(): void {
    if (this.registerForm.valid) {
      this.isloading = true;
      this._AuthService.setRegister(this.registerForm.value).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            this.isloading = false;
            this._NgToastService.success({
              detail: 'SUCCESS',
              summary: 'Registered Successfully',
              duration: 3000,
              position: 'topRight',
            });
            //we do array to send data with routing
            this._Router.navigate(['/login']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isloading = false;
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
      this.registerForm.markAllAsTouched();
    }
  }
}
