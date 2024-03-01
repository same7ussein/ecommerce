import { Category, Product } from 'src/app/shared/interfaces/product';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcommerceDataService } from 'src/app/shared/services/ecommerce-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  ProductDetails: Product = {} as Product;
  productCategoryDetials: Category = {} as Category;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _EcommerceDataService: EcommerceDataService
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let productId: any = params.get('id');
        console.log(productId);
        this._EcommerceDataService.getProductDetails(productId).subscribe({
          next: (response) => {
            this.ProductDetails = response.data;
            this.productCategoryDetials = response.data.category;
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

}
