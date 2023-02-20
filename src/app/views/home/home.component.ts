import { Component, OnInit } from '@angular/core';
import {BudgetChart} from '../../model/budget.chart.model';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  options1: any;
  options2: any;
  budgetChart : BudgetChart = new BudgetChart([0], [0], ['']);
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
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ],
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
