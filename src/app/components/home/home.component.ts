import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category, Product } from 'src/app/shared/interfaces/product';
import { EcommerceDataService } from 'src/app/shared/services/ecommerce-data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];

  categorySliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 5,
      },
    },
    nav: false,
  };

  mainSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      740: {
        items: 2,
      }
    },
    nav: false,
  };
  
  constructor(private _EcommerceDataService: EcommerceDataService) {}
  ngOnInit(): void {
    // get all products
    this._EcommerceDataService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (err: HttpErrorResponse) => {},
    });

    // get Categories
    this._EcommerceDataService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
        console.log(this.categories);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
