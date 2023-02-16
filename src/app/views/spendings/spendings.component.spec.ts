import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingsComponent } from './spendings.component';
import { ButtonModule, CardModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { IconSetService } from '@coreui/icons-angular';
// import { iconSubset } from '../../../icons/icon-subset';
// import { DocsComponentsModule } from '../../../../components';
// import { ButtonsComponent } from './buttons.component';

describe('SpendingsComponent', () => {
  let component: SpendingsComponent;
  let fixture: ComponentFixture<SpendingsComponent>;
  let iconSetService: IconSetService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendingsComponent ],
      imports: [CardModule, GridModule, ButtonModule, IconModule],
      providers: [IconSetService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
