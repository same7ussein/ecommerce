import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryitemComponent } from './categoryitem.component';

describe('CategoryitemComponent', () => {
  let component: CategoryitemComponent;
  let fixture: ComponentFixture<CategoryitemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryitemComponent]
    });
    fixture = TestBed.createComponent(CategoryitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
