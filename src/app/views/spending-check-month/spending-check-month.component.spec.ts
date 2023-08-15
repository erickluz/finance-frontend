import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingCheckMonthComponent } from './spending-check-month.component';

describe('SpendingCheckMonthComponent', () => {
  let component: SpendingCheckMonthComponent;
  let fixture: ComponentFixture<SpendingCheckMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendingCheckMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpendingCheckMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
