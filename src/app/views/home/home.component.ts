import { Component, OnInit } from '@angular/core';
import {BudgetChart} from '../../model/budget.chart.model';
import { DashboardService } from '../dashboard.service';
import { SpendingCategory } from '../../model/spending.category.chart.model';
import { ItemCategory } from '../../model/item.category.chart.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  options1: any;
  options2: any;
  budgetChart : BudgetChart = new BudgetChart([0], [0], ['']);
  spendingCategory: SpendingCategory = new SpendingCategory([new ItemCategory(0, 'Empty')]);
  constructor(private dashboardService: DashboardService) {

  }

  ngOnInit(): void {
    this.dashboardService.getBudgetChart().subscribe(
      (budgetChart) => {
        this.budgetChart = budgetChart;
        console.log(this.budgetChart)
        this.options1Set();
      }
    )
    this.dashboardService.getSpendingCategoryChart().subscribe(
      (spendingCategory) => {
        this.spendingCategory = spendingCategory;
        console.log(this.spendingCategory)
        this.options2Set();
      }
    )
    this.options2Set();
  }

  private options2Set() {
    this.options2 = {
      title: {
        text: 'Spendings by categories',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        top: 'bottom'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: this.spendingCategory.itens,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

  private options1Set() {
    this.options1 = {
      title: {
        text: 'Budget'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Max', 'Spendings']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.budgetChart.months
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Spendings',
          type: 'line',
          color: 'blue',
          label: {
            show: true,
            position: 'top'
          },
          data: this.budgetChart.spendingsMonth
        },
        {
          name: 'Max',
          type: 'line',
          color: 'red',
          label: {
            show: true,
            position: 'top'
          },
          data: this.budgetChart.budgetsMonth
        }
      ]
    };
  }
}
