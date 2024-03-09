import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { EcommerceDataService } from 'src/app/shared/services/ecommerce-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(private _EcommerceDataService: EcommerceDataService) {}
  products: Product[] = [];
  currentPage: number = 1;
  totalPages = 1;
  itemsPerPage = 18;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this._EcommerceDataService
      .getAllProducts(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (res) => {
          this.products = res.data;
          // *10 because 10 mean one pagination 
          this.totalPages = res.metadata.numberOfPages*10;
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
}
