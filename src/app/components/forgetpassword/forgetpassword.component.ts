import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
})
export class ForgetpasswordComponent {
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  isloading: boolean = false;
  isloadingResend: boolean = false;
  timer: number = 0;
  timerInterval: any;

  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.timer = 0;
  }
  forgetpassword: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  verifypassword: FormGroup = this._FormBuilder.group({
    resetCode: ['', [Validators.required]],
  });
  newpasswpord: FormGroup = this._FormBuilder.group({
    email: [''],
    newPassword: [
      '',
      [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)],
    ],
  });

  handlePassword(trueloading: boolean, resendloading: boolean): void {
    if (this.forgetpassword.valid) {
      this.isloading = trueloading;
      this.isloadingResend = resendloading;
      this._AuthService.forgetPassword(this.forgetpassword.value).subscribe({
        next: (res) => {
          console.log(res);
          this._ToastrService.success(res.message);
          this.step1 = false;
          this.step2 = true;
          this.step3 = false;
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
            this._ToastrService.error(err.error.message);
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
            this._ToastrService.success(res.status);
            this.step1 = false;
            this.step2 = false;
            this.step3 = true;
            this.isloading = false;
            this.stopTimer();
          }
        },
        error: (err: HttpErrorResponse) => {
          if (!err.ok) {
            this._ToastrService.error(err.error.message);
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
    if (this.forgetpassword.valid) {
      this.isloading = true;
      let newpassword = this.newpasswpord.value;
      newpassword.email = this.forgetpassword.value.email;
      this._AuthService.resetPassword(newpassword).subscribe({
        next: (res) => {
          console.log(res);
          if (res.token) {
            this.isloading = false;
            localStorage.setItem('etoken', res.token);
            this._ToastrService.success('password reset successfully');
            this._Router.navigate(['/login']);
          }
        },
        error: (err: HttpErrorResponse) => {
          if (!err.ok) {
            this._ToastrService.error(err.error.message);
            this.isloading = false;
          }
        },
      });
    } else {
      this.forgetpassword.markAllAsTouched();
    }
  }

  resendCode(): void {
    this.handlePassword(this.isloading=false,this.isloadingResend=true);
  }
}
