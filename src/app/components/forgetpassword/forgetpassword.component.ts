// forgetpassword.component.ts
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
})
export class ForgetpasswordComponent {
  activeIndex: number = 0;
  steps: MenuItem[];

  isloading: boolean = false;
  isloadingResend: boolean = false;
  timer: number = 0;
  timerInterval: any;

  forgetpassword: FormGroup;
  verifypassword: FormGroup;
  newpasswpord: FormGroup;

  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router,
    private _MessageService: MessageService
  ) {
    this.steps = [
      { label: 'Find Your Account' },
      { label: 'Verify Code' },
      { label: 'Reset Password' },
    ];

    this.forgetpassword = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.verifypassword = this._FormBuilder.group({
      resetCode: ['', [Validators.required]],
    });

    this.newpasswpord = this._FormBuilder.group({
      email: [''],
      newPassword: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)],
      ],
    });
  }

  handlePassword(trueloading: boolean, resendloading: boolean): void {
    if (this.forgetpassword.valid) {
      this.isloading = trueloading;
      this.isloadingResend = resendloading;
      this._AuthService.forgetPassword(this.forgetpassword.value).subscribe({
        next: (res) => {
          console.log(res);
          this._MessageService.add({
            severity: 'success',
            detail: res.message,
          });
          this.activeIndex = 1;
          this.isloading = false;
          this.isloadingResend = false;
          this.startTimer();
          console.log(this.forgetpassword.value.email);
          this.newpasswpord.patchValue({
            email: this.forgetpassword.value.email,
          });
        },
        error: (err: HttpErrorResponse) => {
          if (!err.ok) {
            this._MessageService.add({
              severity: 'error',
              detail: err.error.message,
            });
            this.isloading = false;
            this.isloadingResend = false;
          }
        },
      });
    } else {
      this.forgetpassword.markAllAsTouched();
    }
  }

  verifycode(): void {
    const resetCodeValue: any = this.verifypassword
      .get('resetCode')
      ?.value.toString();
    this.verifypassword.get('resetCode')?.setValue(resetCodeValue);

    if (this.verifypassword.valid) {
      this.isloading = true;
      this._AuthService.verifyPassword(this.verifypassword.value).subscribe({
        next: (res) => {
          if (res.status == 'Success') {
            this._MessageService.add({
              severity: 'success',
              detail: res.status,
            });
            this.activeIndex = 2;
            this.isloading = false;
            this.stopTimer();
          }
        },
        error: (err: HttpErrorResponse) => {
          if (!err.ok) {
            this._MessageService.add({
              severity: 'error',
              detail: err.error.message,
            });
            this.isloading = false;
          }
        },
      });
    } else {
      this.verifypassword.markAllAsTouched();
    }
  }

  startTimer(): void {
    this.timer = 10;
    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      }
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.timerInterval);
    this.timer = 0;
  }

  enterNewPassword(): void {
    if (this.newpasswpord.valid) {
      this.isloading = true;
      let newpassword = this.newpasswpord.value;
      newpassword.email = this.forgetpassword.value.email;
      this._AuthService.resetPassword(newpassword).subscribe({
        next: (res) => {
          console.log(res);
          if (res.token) {
            this.isloading = false;
            localStorage.setItem('etoken', res.token);
            this._MessageService.add({
              severity: 'success',
              detail: 'password reset successfully',
            });
            this._Router.navigate(['/login']);
          }
        },
        error: (err: HttpErrorResponse) => {
          if (!err.ok) {
            this._MessageService.add({
              severity: 'error',
              detail: err.error.message,
            });
            this.isloading = false;
          }
        },
      });
    } else {
      this.newpasswpord.markAllAsTouched();
    }
  }

  resendCode(): void {
    this.handlePassword(false, true);
  }
}
