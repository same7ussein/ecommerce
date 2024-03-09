import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { EcommerceDataService } from 'src/app/shared/services/ecommerce-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';

  constructor(private _EcommerceDataService: EcommerceDataService) {}
  ngOnInit(): void {
    // get all products
    this._EcommerceDataService.getAllProducts(1).subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (err: HttpErrorResponse) => {},
    });
  }
}
