import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Cart } from 'src/app/shared/interfaces/cart';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartDetails: Cart | null = null;
  constructor(
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private _MessageService: MessageService
  ) {}
  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        console.log(this.cartDetails);
        // Check if cart is empty after removing item
        if (!this.cartDetails?.products.length) {
          this.cartDetails = null;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
  removeProduct(id: string, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.removeItemFromCart(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
        this._MessageService.add({
          severity: 'success',
          detail: 'removed successfully',
        });
        // Check if cart is empty after removing item
        console.log(!this.cartDetails?.products.length);
        this._Renderer2.removeAttribute(element, 'disabled');

        if (!this.cartDetails?.products.length) {
          this.cartDetails = null;
        }

        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this._Renderer2.removeAttribute(element, 'disabled');
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

  clearCart(): void {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == 'success') {
          this.cartDetails = null;
          this._CartService.cartNumber.next(0);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
