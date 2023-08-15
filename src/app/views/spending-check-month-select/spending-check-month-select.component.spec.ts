import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingCheckMonthSelectComponent } from './spending-check-month-select.component';

describe('SpendingCheckMonthSelectComponent', () => {
  let component: SpendingCheckMonthSelectComponent;
  let fixture: ComponentFixture<SpendingCheckMonthSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendingCheckMonthSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpendingCheckMonthSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
