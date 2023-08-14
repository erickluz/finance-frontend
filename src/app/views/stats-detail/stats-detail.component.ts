import { Component } from '@angular/core';
import { MonthStats } from 'src/app/model/month.stats.model';
import { TotalsStats } from 'src/app/model/totals.stats.model';
import { DashboardService } from '../dashboard.service';
import { SpendingService } from "../spending.service";
import { Datedto } from 'src/app/model/datedto.model';
import { cilChartPie, cilArrowTop, cilArrowBottom, cilDollar, cilArrowRight } from '@coreui/icons';

@Component({
  selector: 'app-stats-detail',
  templateUrl: './stats-detail.component.html',
  styleUrls: ['./stats-detail.component.scss']
})

export class StatsDetailComponent {
  monthStats: MonthStats = new MonthStats("0", "0", "0", "0", "0", "0", "0");
  totalsStats: TotalsStats = new TotalsStats("0", "0", "0", "0", "0", "0");
  icons = { cilChartPie, cilArrowTop, cilArrowBottom, cilDollar, cilArrowRight };
  dateVoid: Datedto = new Datedto("", "", "");
  dates: Datedto[] = [];
  selectedInitialDate: Datedto = new Datedto("", "", "");
  selectedFinalDate: Datedto = new Datedto("", "", "");
  change: boolean = false;

  constructor(private dashboardService: DashboardService, private spendingService: SpendingService) {
    this.getMonthStats(dashboardService);
    this.getDates();
  }

  private getMonthStats(dashboardService: DashboardService) {
    dashboardService.getMonthStats().subscribe(
      (stats) => {
        this.monthStats = stats;
      }
    );
  }

  private getDates() {
    this.spendingService.getDates().subscribe(
      (dates) => {
        if (!this.change) {
          this.dates = dates;
          this.selectedInitialDate = dates[0];
          this.selectedFinalDate =  this.setActualMonth(dates);
        }
        this.dashboardService.getTotalsStats(this.selectedInitialDate.date, this.selectedFinalDate.date).subscribe(
          (stats) => {
            this.totalsStats = stats;
          }
        );
      }
    );
  }

  private setActualMonth(dates: Datedto[]) : Datedto {
    for (let datedto of dates) {
      if (datedto.monthNumber == this.getActualMonth()
      && new Date(datedto.date).getFullYear().toString() == new Date().getFullYear().toString()) {
        return datedto;
      }
    }
    return dates[dates.length-1];
  }

  getActualMonth(): string {
    let tmp = new Date();
    return (tmp.getMonth() + 1).toString();
  }

  changeFilters() {
    this.change = true
    this.getDates();
  }
}
