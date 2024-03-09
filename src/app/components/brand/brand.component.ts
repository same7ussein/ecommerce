import { Component, Input } from '@angular/core';
import { Brand } from 'src/app/shared/interfaces/cart';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent {
  @Input() brand?: Brand;
}
