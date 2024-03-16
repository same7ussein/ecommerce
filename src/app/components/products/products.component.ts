import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcommerceDataService } from 'src/app/shared/services/ecommerce-data.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  @Input() product: any;

  wishlistData: string[] = [];
  constructor(
    private _EcommerceDataService: EcommerceDataService,
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private _MessageService: MessageService
  ) {}
  @Input() categoryId: number = 0;
  @Input() brandId: number = 0;
  products: Product[] = [];
  currentPage: number = 1;
  totalPages = 1;
  itemsPerPage = 18;

  ngOnInit(): void {
    this.loadProducts();
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

  loadProducts(): void {
    this._EcommerceDataService
      .getAllProducts(
        this.currentPage,
        this.itemsPerPage,
        this.categoryId,
        this.brandId
      )
      .subscribe({
        next: (res) => {
          this.products = res.data;
          console.log(this.products);

          // *10 because 10 mean one pagination
          this.totalPages = res.metadata.numberOfPages * 10;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.loadProducts();
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
