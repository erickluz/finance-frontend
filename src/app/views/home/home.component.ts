import { Component, OnInit } from '@angular/core';
import { BudgetChart } from '../../model/budget.chart.model';
import { DashboardService } from '../dashboard.service';
import { SpendingCategory } from '../../model/spending.category.chart.model';
import { ItemCategory } from '../../model/item.category.chart.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  errorMessage: string = '';
  visible = false;
  options1: any;
  options2: any;
  budgetChart : BudgetChart = new BudgetChart([0], [0], [0], ['']);
  spendingCategory: SpendingCategory = new SpendingCategory([new ItemCategory(true, 0, 'Empty', '')]);
  constructor(private dashboardService: DashboardService) {

  }

  ngOnInit(): void {
    this.clearCharts();
    this.getBudgetChart();
  }

  private getSpendingCategoryChart() {
    this.dashboardService.getSpendingCategoryChart().subscribe({
      next: this.handleSpendingCategoryChartResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  private getBudgetChart() {
    this.dashboardService.getBudgetChart().subscribe({
      next: this.handleBudgetChartResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  handleBudgetChartResponse(budgetChart: BudgetChart) {
    this.budgetChart = budgetChart;
    this.options1Set();
    this.getSpendingCategoryChart();
  }

  handleSpendingCategoryChartResponse(spendingCategory: SpendingCategory) {
    this.spendingCategory = spendingCategory;
    this.options2Set();
  }

  handleError(error: HttpErrorResponse) {
    this.errorMessage = error.statusText;
    this.visible = !this.visible;
  }

  clearCharts() {
    this.budgetChart = new BudgetChart([0], [0], [0], ['']);
    this.spendingCategory = new SpendingCategory([new ItemCategory(true, 0, 'Empty', '')]);;
    this.options1Set();
    this.options2Set();
  }

  private options2Set() {
    this.options2 = {
      title: {
        text: 'Expenses for the current month by categories',
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
          name: 'Spendigs',
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
          lineStyle: {
            width: 3
          },
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
          lineStyle: {
            width: 3
          },
          smooth: true,
          label: {
            show: true,
            position: 'top'
          },
          data: this.budgetChart.budgetsMonth
        }
      ]
    };
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
  }
}
