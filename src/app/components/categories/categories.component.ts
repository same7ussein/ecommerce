import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/interfaces/product';
import { EcommerceDataService } from 'src/app/shared/services/ecommerce-data.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private _EcommerceDataService: EcommerceDataService) {}
  allCategory: Category[] = [];

  ngOnInit(): void {
    this._EcommerceDataService.getCategories().subscribe({
      next: (res) => {
        this.allCategory = res.data;
        console.log(this.allCategory);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
