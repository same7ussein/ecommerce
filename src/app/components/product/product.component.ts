import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product: any;

  wishlistData: string[] = [];

  constructor(
    private _CartService: CartService,
    private _WishlistService: WishlistService,
    private _MessageService: MessageService
  ) {}

  ngOnInit(): void {
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this._WishlistService.wishNum.next(res.count);
        const newData = res.data.map((item: any) => item._id);
        this.wishlistData = newData;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  addCart(idProduct: string): void {
    this._CartService.addToCart(idProduct).subscribe({
      next: (res) => {
        this._MessageService.add({
          severity: 'success',
          detail: res.message,
        });
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  addWishlist(id: string): void {
    this._WishlistService.addToWishlist(id).subscribe({
      next: (res) => {
      this._MessageService.add({
        severity: 'success',
        detail: res.message,
      });        this.wishlistData = res.data;
        this._WishlistService.wishNum.next(res.data.length);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  removeFromWishlist(id: string): void {
    this._WishlistService.removeItemFromWishlist(id).subscribe({
      next: (res) => {
      this._MessageService.add({
        severity: 'success',
        detail: res.message,
      });        this.wishlistData = res.data;
        this._WishlistService.wishNum.next(res.data.length);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
