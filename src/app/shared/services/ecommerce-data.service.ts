import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EcommerceDataService {
  ordersNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _HttpClient: HttpClient) {}
  getAllProducts(
    numberOfPage: number,
    limit: number = 40,
    categoryId: number = 0,
    brandId: number = 0
  ): Observable<any> {
    if (categoryId == 0 && brandId == 0) {
      return this._HttpClient.get(
        `https://ecommerce.routemisr.com/api/v1/products?limit=${limit}&page=${numberOfPage}`
      );
    } else if (brandId != 0) {
      return this._HttpClient.get(
        `https://ecommerce.routemisr.com/api/v1/products?limit=${limit}&page=${numberOfPage}&brand=${brandId}`
      );
    } else {
      return this._HttpClient.get(
        `https://ecommerce.routemisr.com/api/v1/products?limit=${limit}&page=${numberOfPage}&category[in]=${categoryId}`
      );
    }
  }

  getProductDetails(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  getCategories(): Observable<any> {
    return this._HttpClient.get(
      'https://ecommerce.routemisr.com/api/v1/categories'
    );
  }
  getSpecificCategory(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );
  }

  getAllBrand(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );
  }

  getSpecificBrand(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`
    );
  }

  getAllorder(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
  }
}
