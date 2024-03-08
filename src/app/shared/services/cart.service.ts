import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  headers: any = {
    token: localStorage.getItem('etoken'),
  };

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

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

  updateCartProduct(idProduct: string, newCount: number): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${idProduct}`,
      {
        count: newCount,
      },
      {
        headers: this.headers,
      }
    );
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: this.headers,
      }
    );
  }

  onlineCheckout(cartId: string, address: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: address,
      },
      {
        headers: this.headers,
      }
    );
  }
  cashCheckout(cartId: string, address: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        shippingAddress: address,
      },
      {
        headers: this.headers,
      }
    );
  }
}
