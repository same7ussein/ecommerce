import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProductComponent } from './category-product.component';

describe('CategoryProductComponent', () => {
  let component: CategoryProductComponent;
  let fixture: ComponentFixture<CategoryProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryProductComponent]
    });
    fixture = TestBed.createComponent(CategoryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
