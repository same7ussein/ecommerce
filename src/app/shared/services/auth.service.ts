import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(private _HttpClient: HttpClient, private _Router: Router) {}
  setRegister(userData: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      userData
    );
  }

  setLogin(userData: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      userData
    );
  }

  decodeUserData() {
    if (localStorage.getItem('etoken')) {
      let encodeToken: any = localStorage.getItem('etoken');
      let decodeToken: any = jwtDecode(encodeToken);
      this.userData = decodeToken;
      return this.userData;
    }
  }

  logOutUser(): void {
    if (localStorage.getItem('etoken')) {
      localStorage.removeItem('etoken');
      this._Router.navigate(['/login']);
    }
  }

  forgetPassword(userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      userData
    );
  }

  verifyPassword(userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      userData
    );
  }

  resetPassword(newPassword: object): Observable<any> {
    return this._HttpClient.put(
      'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
      newPassword
    );
  }
}
