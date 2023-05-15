import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import {BudgetChart} from '../../model/budget.chart.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-chart-budget-detail',
  templateUrl: './chart-budget-detail.component.html',
  styleUrls: ['./chart-budget-detail.component.scss']
})
export class ChartBudgetDetailComponent {
  options1: any;
  budgetChart : BudgetChart = new BudgetChart([0], [0], [0],['']);
  errorMessage: string = '';
  visible = false;

  constructor(private dashboardService: DashboardService) {

  }

  ngOnInit(): void {
    this.clearCharts();
    this.getBudgetChart();
  }
  private getBudgetChart() {
    this.dashboardService.getBudgetChart().subscribe({
      next: this.handleBudgetChartResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  handleError(error: HttpErrorResponse) {
    this.errorMessage = error.statusText;
    this.visible = !this.visible;
  }

  handleBudgetChartResponse(budgetChart: BudgetChart) {
    this.budgetChart = budgetChart;
    this.options1Set();
  }
  clearCharts() {
    this.budgetChart = new BudgetChart([0], [0], [0], ['']);
    this.options1Set();
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
        data: ['Max', 'Spendings', 'Budget Percent']
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
      yAxis: [
        {
          type: 'value',
          name: 'Spending/Revenue',
          axisLabel: {
            formatter: 'R$ {value}'
          }
        },
        {
          type: 'value',
          name: 'Budget Percent',
          axisLabel: {
            formatter: '{value} %'
          }
        }
      ],
      series: [
        {
          name: 'Budget Percent',
          type: 'bar',
          yAxisIndex: 1,
          barWidth: 5,
          color: '#948484',
          data: this.budgetChart.percentBudget,
        },
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

}
