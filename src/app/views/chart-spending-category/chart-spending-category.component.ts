import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { SpendingCategory } from '../../model/spending.category.chart.model';
import { ItemCategory } from '../../model/item.category.chart.model';
import { Datedto } from 'src/app/model/datedto.model';
import { SpendingService } from "../spending.service";
import {ListItens} from '../list.itens';

@Component({
  selector: 'app-chart-spending-category',
  templateUrl: './chart-spending-category.component.html',
  styleUrls: ['./chart-spending-category.component.scss']
})
export class ChartSpendingCategoryComponent {
  listItens : ListItens = new ListItens();
  selectedInitialDate: Datedto = new Datedto("", "", "");
  selectedFinalDate: Datedto = new Datedto("", "", "");
  dates: Datedto[] = [];
  dateVoid: Datedto = new Datedto("", "", "");
  options: any;
  listItensCategory: ItemCategory[] = [];
  change: boolean = false;
  total = 0;
  spendingCategory: SpendingCategory = new SpendingCategory([new ItemCategory(true, 0, 'Empty')]);

  constructor(private dashboardService: DashboardService, private spendingService: SpendingService,) {
    this.getDates();
  }

  private getSpendings() {
    this.clearCharts();
    this.dashboardService.getSpendingCategoryChart(this.selectedInitialDate.date, this.selectedFinalDate.date)
    .subscribe(
      (spendingCategory) => {
        this.spendingCategory = spendingCategory;
        this.adjustItens(spendingCategory.itens)
        this.listItensCategory = spendingCategory.itens;
        this.listItens.list = this.listItensCategory;
        this.calculateTotal();
        this.optionsSet();
      }
    );
  }

  adjustItens(itens: ItemCategory[]) {
    for (let item of itens) {
      item.check = true
    }
  }

  changeDate() {
    this.change = true
    this.getDates();
  }

  clearCharts() {
    this.spendingCategory = new SpendingCategory([new ItemCategory(true, 0, 'Empty')]);;
    this.optionsSet();
  }

  private getDates() {
    this.spendingService.getDates().subscribe(
      (dates) => {
        if (!this.change) {
          this.dates = dates;
          if (this.dates) {
            for (let datedto of dates) {
              if (datedto.monthNumber == this.getActualMonth()) {
                this.selectedInitialDate = datedto;
                this.selectedFinalDate = datedto;
              }
            }
          }
        }
        this.getSpendings();
      }
    );
  }

  getActualMonth(): string {
    let tmp = new Date();
    return (tmp.getMonth() + 1).toString();
  }

  fieldsChange(values:any, i : number):void {
    console.log(values.target.checked);
    this.listItensCategory[i].check = values.target.checked
    this.calculateTotal()
  }

  public calculateTotal() {
    console.log(this.listItensCategory)
    this.total = 0;
    for (let spending of this.listItensCategory) {
      if (spending.check) {
        this.total = this.total + spending.value;
      }
    }
  }

  private optionsSet() {
    this.options = {
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

}
