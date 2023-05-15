import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RevenuesComponent } from './revenues/revenues.component';
import { SetupComponent } from './setup/setup.component';
import { SpendingsComponent } from './spendings/spendings.component';
import { ChartSpendingCategoryComponent } from './chart-spending-category/chart-spending-category.component';
import { ChartBudgetDetailComponent } from './chart-budget-detail/chart-budget-detail.component';
import { CardsComponent } from './cards/cards.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Views',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'Home',
        },
      },
      {
        path: 'setup',
        component: SetupComponent,
        data: {
          title: 'Setup',
        },
      },
      {
        path: 'spendings',
        component: SpendingsComponent,
        data: {
          title: 'Spendings',
        },
      },
      {
        path: 'revenues',
        component: RevenuesComponent,
        data: {
          title: 'Revenues',
        },
      },
      {
        path: 'chart-spending-category',
        component: ChartSpendingCategoryComponent,
        data: {
          title: 'Chart Spending Category',
        },
      },
      {
        path: 'chart-budget-detail',
        component: ChartBudgetDetailComponent,
        data: {
          title: 'Chart Budget Detail',
        },
      },
      {
        path: 'cards',
        component: CardsComponent,
        data: {
          title: 'Cards',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule {}
