import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Brand } from 'src/app/shared/interfaces/product';
import { EcommerceDataService } from 'src/app/shared/services/ecommerce-data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent {
  constructor(
    private _EcommerceDataService: EcommerceDataService,
  ) {}
  allBrand: Brand[] = [];
  ngOnInit(): void {
    this._EcommerceDataService.getAllBrand().subscribe({
      next: (res) => {
        this.allBrand = res.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });

  }
}
