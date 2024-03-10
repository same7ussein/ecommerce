import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/interfaces/product';
import { EcommerceDataService } from 'src/app/shared/services/ecommerce-data.service';

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.css'],
})
export class CategoryProductComponent implements OnInit {
  categoryId: any = 0;
  CategoryData: Category = {} as Category;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _EcommerceDataService: EcommerceDataService
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryId = params.get('id');
        console.log(this.categoryId);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });

    if (this.categoryId != 0) {
      this.getCategory(this.categoryId);
    }
  }

  getCategory(id: string): void {
    this._EcommerceDataService.getSpecificCategory(id).subscribe({
      next: (res) => {
        this.CategoryData = res.data;
        console.log(this.CategoryData.image);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
