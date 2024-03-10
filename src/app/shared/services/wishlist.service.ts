import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  headers: any = {
    token: localStorage.getItem('etoken'),
  };

  wishNum:BehaviorSubject<number>=new BehaviorSubject(0)
  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/';
  constructor(private _HttpClient: HttpClient) {}
  addToWishlist(id: string): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl + `wishlist`,
      {
        productId: id,
      },
      {
        headers: this.headers,
      }
    );
  }

  getWishlist(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `wishlist`, {
      headers: this.headers,
    });
  }
  removeItemFromWishlist(id:string): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `wishlist/${id}`, {
      headers: this.headers,
    });
  }
}
