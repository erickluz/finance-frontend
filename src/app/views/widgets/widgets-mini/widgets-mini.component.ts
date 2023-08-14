import { Component } from '@angular/core';
import { cilChartPie, cilArrowTop, cilArrowBottom, cilDollar, cilArrowRight } from '@coreui/icons';
import { MonthStats } from 'src/app/model/month.stats.model';
import { TotalsStats } from 'src/app/model/totals.stats.model';
import { DashboardService } from '../../dashboard.service';
import { SpendingService } from "../../spending.service";
import { Datedto } from 'src/app/model/datedto.model';

@Component({
  selector: 'app-widgets-mini',
  templateUrl: './widgets-mini.component.html',
  styleUrls: ['./widgets-mini.component.scss']
})
export class WidgetsMiniComponent {
  icons = { cilChartPie, cilArrowTop, cilArrowBottom, cilDollar, cilArrowRight };
  monthStats: MonthStats = new MonthStats("0", "0", "0", "0", "0", "0", "0");
  totalsStats: TotalsStats = new TotalsStats("0", "0", "0", "0", "0", "0");

  constructor(private dashboardService: DashboardService, private spendingService: SpendingService) {
    dashboardService.getMonthStats().subscribe(
      (stats) => {
        this.monthStats = stats;
      }
    );
    this.getDates();
  }

  private getDates() {
    this.spendingService.getDates().subscribe(
      (dates) => {
        let initialDate = dates[0].date
        let finalDate = this.setActualMonth(dates);
        this.dashboardService.getTotalsStats(initialDate, finalDate).subscribe(
          (stats) => {
            this.totalsStats = stats;
          }
        );
      }
    );
  }

  private setActualMonth(dates: Datedto[]) : string {
    for (let datedto of dates) {
      if (datedto.monthNumber == this.getActualMonth()) {
        return datedto.date;
      }
    }
    return dates[dates.length-1].date;
  }

  getActualMonth(): string {
    let tmp = new Date();
    return (tmp.getMonth() + 1).toString();
  }
}
