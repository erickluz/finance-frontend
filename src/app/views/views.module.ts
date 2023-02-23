import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule, NgbAlertModule, NgbDatepicker, NgbDateStruct, NgbInputDatepicker, NgbDatepickerModule, NgbDateAdapter  } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { CommonModule, registerLocaleData, CurrencyPipe } from '@angular/common';
import { HomeComponent } from './home/home.component';

import { CardModule,  BadgeModule, GridModule, NavModule, UtilitiesModule, TabsModule, ButtonModule, ModalModule, FormModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { ViewsRoutingModule } from './views-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';

import { WidgetsModule } from './widgets/widgets.module';
import { SetupComponent } from './setup/setup.component';
import { SpendingsComponent } from './spendings/spendings.component';
import { SpendingService } from './spending.service';
import { CategoryService } from './category.service';
import { RevenueService } from './revenue.service';
import { DashboardService } from './dashboard.service';
import { TypeRevenueService } from './type.revenue.service';
import localePt from '@angular/common/locales/pt';
import { RevenuesComponent } from './revenues/revenues.component';
import { CustomAdapter } from './DateFormatter/CustomAdapter';
import { CustomDateParserFormatter } from './DateFormatter/CustomDateParserFormatter';
import {FilterPipe} from './filter.pipe';
registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    HomeComponent,
    SetupComponent,
    SpendingsComponent,
    RevenuesComponent,
    FilterPipe
  ],
  imports: [
    NgbPaginationModule,
    JsonPipe,
    NgbDatepickerModule,
    NgbAlertModule,
    NgbDatepicker,
    NgbInputDatepicker,
    BadgeModule,
    ReactiveFormsModule,
    FormModule,
    FormsModule,
    ModalModule,
    ButtonModule,
    CommonModule,
    ViewsRoutingModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    IconModule,
    NavModule,
    TabsModule,
    WidgetsModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [
    SpendingService,
    CategoryService,
    RevenueService,
    TypeRevenueService,
    CurrencyPipe,
    CustomAdapter,
    CustomDateParserFormatter,
    DashboardService,
    {
      provide: LOCALE_ID,
      useValue: 'pt'
  },

  /* if you don't provide the currency symbol in the pipe,
  this is going to be the default symbol (R$) ... */
  {
      provide:  DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
  },
  ]
})
export class ViewsModule { }
