import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() product: any;
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  addCart(idProduct: string): void {
    this._CartService.addToCart(idProduct).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
