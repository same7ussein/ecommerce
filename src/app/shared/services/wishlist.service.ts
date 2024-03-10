import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishNum: BehaviorSubject<number> = new BehaviorSubject(0);
  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/';
  constructor(private _HttpClient: HttpClient) {}
  addToWishlist(id: string): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl + `wishlist`,
      {
        productId: id,
      },
      {
        headers: {
          token: localStorage.getItem('etoken')!,
        },
      }
    );
  }

  getWishlist(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `wishlist`, {
      headers: {
        token: localStorage.getItem('etoken')!,
      },
    });
  }
  removeItemFromWishlist(id: string): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `wishlist/${id}`, {
      headers: {
        token: localStorage.getItem('etoken')!,
      },
    });
  }
}
