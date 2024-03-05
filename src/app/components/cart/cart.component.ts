import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/shared/interfaces/cart';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartDetails: Cart = {} as Cart;
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        console.log(this.cartDetails);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
  removeProduct(id: string): void {
    this._CartService.removeItemFromCart(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
        this._ToastrService.success('removed successfully');
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  changeCount(id: string, count: number): void {
    if (count > 0) {
      this._CartService.updateCartProduct(id, count).subscribe({
        next: (res) => {
          this.cartDetails = res.data;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    }
  }
}
