import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsMiniComponent } from './widgets-mini.component';

describe('WidgetsMiniComponent', () => {
  let component: WidgetsMiniComponent;
  let fixture: ComponentFixture<WidgetsMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetsMiniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetsMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
