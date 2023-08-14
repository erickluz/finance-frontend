import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringBillingComponent } from './recurring-billing.component';

describe('RecurringBillingComponent', () => {
  let component: RecurringBillingComponent;
  let fixture: ComponentFixture<RecurringBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecurringBillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
