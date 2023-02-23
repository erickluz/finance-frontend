import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSpendingCategoryComponent } from './chart-spending-category.component';

describe('ChartSpendingCategoryComponent', () => {
  let component: ChartSpendingCategoryComponent;
  let fixture: ComponentFixture<ChartSpendingCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSpendingCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartSpendingCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
