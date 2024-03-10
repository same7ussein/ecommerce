import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlist: Product[] = [];
  wishlistData: string[] = [];
  constructor(
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlist = res.data;
        this._WishlistService.wishNum.next(res.count);
        const newData = res.data.map((item: any) => item._id);
        this.wishlistData = newData;
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  addCart(idProduct: string): void {
    this._CartService.addToCart(idProduct).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
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
        this._ToastrService.success(res.message);
        this.wishlistData = res.data;
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
        this._ToastrService.success(res.message);
        this.wishlistData = res.data;
        this._WishlistService.wishNum.next(res.data.length);

        const newData = this.wishlist.filter((item: any) =>
          this.wishlistData.includes(item._id)
        );
        this.wishlist = newData;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
