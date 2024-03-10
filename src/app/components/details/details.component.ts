import { Category, Product } from 'src/app/shared/interfaces/product';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcommerceDataService } from 'src/app/shared/services/ecommerce-data.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  images: any[] | undefined;

  responsiveOptions: any[] | undefined;

  ProductDetails: Product = {} as Product;
  productCategoryDetials: Category = {} as Category;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _EcommerceDataService: EcommerceDataService,
    private _CartService: CartService,
    private _MessageService: MessageService
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let productId: any = params.get('id');
        this._EcommerceDataService.getProductDetails(productId).subscribe({
          next: (response) => {
            this.ProductDetails = response.data;
            this.productCategoryDetials = response.data.category;
            this.images = this.ProductDetails.images;
            console.log(this.images);
            this.responsiveOptions = [
              {
                breakpoint: '1024px',
                numVisible: 4,
              },
              {
                breakpoint: '768px',
                numVisible: 3,
              },
              {
                breakpoint: '560px',
                numVisible: 1,
              },
            ];
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
        });
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
}
