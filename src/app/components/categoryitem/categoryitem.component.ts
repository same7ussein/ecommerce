import { Component, Input } from '@angular/core';
import { Category } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-categoryitem',
  templateUrl: './categoryitem.component.html',
  styleUrls: ['./categoryitem.component.css'],
})
export class CategoryitemComponent {
  @Input() category?: Category;
}
