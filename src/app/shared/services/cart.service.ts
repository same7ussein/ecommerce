import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  headers: any = {
    token: localStorage.getItem('etoken'),
  };
  constructor(private _HttpClient: HttpClient) {}
  addToCart(idProduct: string): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: idProduct,
      },
      {
        headers: this.headers,
      }
    );
  }

  getCart(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: this.headers,
    });
  }

  removeItemFromCart(id: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        headers: this.headers,
      }
    );
  }

  updateCartProduct(idProduct:string,newCount:number): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${idProduct}`,
      {
        count: newCount,
      },
      {
        headers:this.headers
      }
    );
  }
}
