import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcommerceDataService } from 'src/app/shared/services/ecommerce-data.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';
  @Input() product: any;
  wishlistData: string[] = [];

  constructor(
    private _EcommerceDataService: EcommerceDataService,
    private _CartService: CartService,
    private _WishlistService: WishlistService,
    private _MessageService: MessageService
  ) {}
  ngOnInit(): void {
    // get all products
    this._EcommerceDataService.getAllProducts(1).subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (err: HttpErrorResponse) => {},
    });

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
        });
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
        this._MessageService.add({
          severity: 'success',
          detail: res.message,
        });
        this.wishlistData = res.data;
        this._WishlistService.wishNum.next(res.data.length);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
