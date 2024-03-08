import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartId: any = '';
  constructor(
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private _Router: Router
  ) {}
  chekout: FormGroup = this._FormBuilder.group({
    details: [
      '',
      [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(100),
      ],
    ],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
    city: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(30)],
    ],
  });
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  onlinecheckout(): void {
    if (this.chekout.valid) {
      this._CartService
        .onlineCheckout(this.cartId, this.chekout.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.status == 'success') {
              window.open(res.session.url, '_self');
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
        });
    } else {
      this.chekout.markAllAsTouched();
    }
  }

  cashcheckout(): void {
    if (this.chekout.valid) {
      this._CartService
        .cashCheckout(this.cartId, this.chekout.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.status == 'success') {
              this._Router.navigate(['/allorders']);
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
        });
    } else {
      this.chekout.markAllAsTouched();
    }
  }
}
