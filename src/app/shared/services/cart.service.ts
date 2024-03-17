import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _HttpClient: HttpClient) {}
  addToCart(idProduct: string): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: idProduct,
      },
      {
        headers: {
          token: localStorage.getItem('etoken')!,
        },
      }
    );
  }

  getCart(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: {
        token: localStorage.getItem('etoken')!,
      },
    });
  }

  removeItemFromCart(id: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        headers: {
          token: localStorage.getItem('etoken')!,
        },
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
        headers: {
          token: localStorage.getItem('etoken')!,
        },
      }
    );
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: {
          token: localStorage.getItem('etoken')!,
        },
      }
    );
  }

  onlineCheckout(cartId: string, address: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://same7ussein.github.io/ecommerce`,
      {
        shippingAddress: address,
      },
      {
        headers: {
          token: localStorage.getItem('etoken')!,
        },
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
        headers: {
          token: localStorage.getItem('etoken')!,
        },
      }
    );
  }
}
