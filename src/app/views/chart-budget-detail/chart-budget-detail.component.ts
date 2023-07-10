import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import {BudgetChart} from '../../model/budget.chart.model';
import {SpendingDayChart} from '../../model/spending.day.chart.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Datedto } from 'src/app/model/datedto.model';
import { SpendingService } from "../spending.service";

@Component({
  selector: 'app-chart-budget-detail',
  templateUrl: './chart-budget-detail.component.html',
  styleUrls: ['./chart-budget-detail.component.scss']
})
export class ChartBudgetDetailComponent {
  options1: any;
  options2: any;
  budgetChart : BudgetChart = new BudgetChart([0], [0], [0], ['']);
  spendingDayChart : SpendingDayChart = new SpendingDayChart([0], []);
  errorMessage: string = '';
  visible = false;
  selectedInitialDate: Datedto = new Datedto("", "", "");
  selectedFinalDate: Datedto = new Datedto("", "", "");
  change: boolean = false;
  dates: Datedto[] = [];
  dateVoid: Datedto = new Datedto("", "", "");

  constructor(private dashboardService: DashboardService, private spendingService: SpendingService) {
    this.getDates();
  }

  ngOnInit(): void {
    this.clearCharts();
    this.getSpendingByDay();
  }

  private getDates() {
    this.spendingService.getDates().subscribe(
      (dates) => {
        this.setOneYearDateDefault(dates);
        this.getBudgetChart();
      }
    );
  }
  setOneYearDateDefault(dates: Datedto[]) {
    if (!this.change) {
      this.dates = dates;
      if (this.dates) {
        for (let i = 0; i < dates.length; i++) {
          if (dates[i].monthNumber == this.getActualMonth()
            && new Date(dates[i].date).getFullYear().toString() == new Date().getFullYear().toString()) {
            let j = i;
            j -= 5;
            if (j < 0) {
              j = 0;
            }
            this.selectedInitialDate = dates[j];
            j = i
            j += 6
            if (j > dates.length) {
              j = dates.length
            }
            console.log(j)
            this.selectedFinalDate = dates[j];
          }
        }
      }
    }
  }

  changeFilters() {
    this.change = true
    this.getDates();
  }

  getActualMonth(): string {
    let tmp = new Date();
    return (tmp.getMonth() + 1).toString();
  }

  private getBudgetChart() {
    this.dashboardService.getBudgetChart(this.selectedInitialDate.date, this.selectedFinalDate.date).subscribe({
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
    this.spendingDayChart = new SpendingDayChart([0], []);
    this.options1Set();
    this.options2Set();
  }

  private getSpendingByDay() {
    this.dashboardService.getSpendingPerDay().subscribe({
      next: this.handleSpendingPerDayChartResponse.bind(this),
      error: this.handleError.bind(this)
    })
  }

  handleSpendingPerDayChartResponse(spendingDayChart: SpendingDayChart) {
    this.spendingDayChart = spendingDayChart;
    this.options2Set();
  }

  private options1Set() {
    this.options1 = {
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
          label: {
            show: true,
            position: 'top'
          },
          data: this.budgetChart.budgetsMonth
        }
      ]
    };
  }

  private options2Set() {
    this.options2 = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: this.spendingDayChart.days
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.spendingDayChart.values,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };
  }

}
