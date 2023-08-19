import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RevenuesComponent } from './revenues/revenues.component';
import { SetupComponent } from './setup/setup.component';
import { SpendingsComponent } from './spendings/spendings.component';
import { SpendingCheckComponent } from './spending-check/spending-check.component';
import { SpendingCheckMonthComponent } from './spending-check-month/spending-check-month.component';
import { SpendingCheckMonthSelectComponent } from './spending-check-month-select/spending-check-month-select.component';
import { ChartSpendingCategoryComponent } from './chart-spending-category/chart-spending-category.component';
import { ChartBudgetDetailComponent } from './chart-budget-detail/chart-budget-detail.component';
import { StatsDetailComponent } from './stats-detail/stats-detail.component';
import { CardsComponent } from './cards/cards.component';
import { CategoryComponent } from './category/category.component';
import { BudgetComponent } from './budget/budget.component';

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
        path: 'stats-detail',
        component: StatsDetailComponent,
        data: {
          title: 'Stats Detail',
        },
      },
      {
        path: 'cards',
        component: CardsComponent,
        data: {
          title: 'Cards',
        },
      },
      {
        path: 'category',
        component: CategoryComponent,
        data: {
          title: 'Category',
        },
      },
      {
        path: 'budget',
        component: BudgetComponent,
        data: {
          title: 'Budget',
        },
      },
      {
        path: 'spending-check',
        component: SpendingCheckComponent,
        data: {
          title: 'Spending Check',
        },
      },
      {
        path: 'spending-check-month',
        component: SpendingCheckMonthComponent,
        data: {
          title: 'Spending Check Month',
        },
      },
      {
        path: 'spending-check-month/:id',
        component: SpendingCheckMonthComponent,
        data: {
          title: 'Spending Check Month',
        },
      },
      {
        path: 'spending-check-month-select',
        component: SpendingCheckMonthSelectComponent,
        data: {
          title: 'Spending Check Month Select',
        },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule {}
