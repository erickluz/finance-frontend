import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBudgetDetailComponent } from './chart-budget-detail.component';

describe('ChartBudgetDetailComponent', () => {
  let component: ChartBudgetDetailComponent;
  let fixture: ComponentFixture<ChartBudgetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartBudgetDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartBudgetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
