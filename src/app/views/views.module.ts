import { NgModule  } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

import { CardModule,  BadgeModule, GridModule, NavModule, UtilitiesModule, TabsModule, ButtonModule, ModalModule, FormModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { ViewsRoutingModule } from './views-routing.module';

import { WidgetsModule } from './widgets/widgets.module';
import { SetupComponent } from './setup/setup.component';
import { SpendingsComponent } from './spendings/spendings.component';
import { SpendingService } from './spending.service';

@NgModule({
  declarations: [
    HomeComponent,
    SetupComponent,
    SpendingsComponent,
  ],
  imports: [
    BadgeModule,
    ReactiveFormsModule,
    FormModule,
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
  ],
  providers: [
    SpendingService
  ]
})
export class ViewsModule { }
