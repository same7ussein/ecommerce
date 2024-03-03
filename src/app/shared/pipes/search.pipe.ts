import { Product } from './../interfaces/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], term: string): Product[] {
    console.log(products);
    return products
      .filter((product) =>
        product.title.toLowerCase().includes(term.toLowerCase())
      )
      .slice(0, 12);
  }
}
