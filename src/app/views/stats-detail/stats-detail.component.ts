import { Component } from '@angular/core';
import { Stats } from 'src/app/model/stats.model';
import { DashboardService } from '../dashboard.service';
import { cilChartPie, cilArrowTop, cilArrowBottom, cilDollar, cilArrowRight } from '@coreui/icons';

@Component({
  selector: 'app-stats-detail',
  templateUrl: './stats-detail.component.html',
  styleUrls: ['./stats-detail.component.scss']
})

export class StatsDetailComponent {
  stats: Stats = new Stats("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
  icons = { cilChartPie, cilArrowTop, cilArrowBottom, cilDollar, cilArrowRight };

  constructor(private dashboardService: DashboardService) {
    dashboardService.getStats().subscribe(
      (stats) => {
        this.stats = stats;
      }
    )
  }
}
