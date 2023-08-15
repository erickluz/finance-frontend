import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingCheckComponent } from './spending-check.component';

describe('SpendingCheckComponent', () => {
  let component: SpendingCheckComponent;
  let fixture: ComponentFixture<SpendingCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendingCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpendingCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
