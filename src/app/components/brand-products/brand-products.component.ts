import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/shared/interfaces/product';
import { EcommerceDataService } from 'src/app/shared/services/ecommerce-data.service';

@Component({
  selector: 'app-brand-products',
  templateUrl: './brand-products.component.html',
  styleUrls: ['./brand-products.component.css'],
})
export class BrandProductsComponent {
  brandId: any = 0;
  brandData: Brand = {} as Brand;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _EcommerceDataService: EcommerceDataService
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.brandId = params.get('id');
        console.log(this.brandId);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });

    if (this.brandId != 0) {
      this.getBrand(this.brandId);
    }
  }

  getBrand(id: string): void {
    this._EcommerceDataService.getSpecificBrand(id).subscribe({
      next: (res) => {
        this.brandData = res.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
