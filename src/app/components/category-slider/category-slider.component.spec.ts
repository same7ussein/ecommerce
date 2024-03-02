import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySliderComponent } from './category-slider.component';

describe('CategorySliderComponent', () => {
  let component: CategorySliderComponent;
  let fixture: ComponentFixture<CategorySliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorySliderComponent]
    });
    fixture = TestBed.createComponent(CategorySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
