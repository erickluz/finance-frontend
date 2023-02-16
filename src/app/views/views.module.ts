import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { ViewsRoutingModule } from './views-routing.module';

import { WidgetsModule } from './widgets/widgets.module';
import { SetupComponent } from './setup/setup.component';
import { SpendingsComponent } from './spendings/spendings.component';

@NgModule({
  declarations: [
    HomeComponent,
    SetupComponent,
    SpendingsComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    IconModule,
    NavModule,
    TabsModule,
    WidgetsModule
  ]
})
export class ViewsModule { }
