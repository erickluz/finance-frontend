import { Component } from '@angular/core';
import { cilChartPie, cilArrowTop, cilArrowBottom, cilDollar, cilArrowRight } from '@coreui/icons';
import { Stats } from 'src/app/model/stats.model';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-widgets-mini',
  templateUrl: './widgets-mini.component.html',
  styleUrls: ['./widgets-mini.component.scss']
})
export class WidgetsMiniComponent {
  icons = { cilChartPie, cilArrowTop, cilArrowBottom, cilDollar, cilArrowRight };
  stats: Stats = new Stats("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");

  constructor(private dashboardService: DashboardService) {
    dashboardService.getStats().subscribe(
      (stats) => {
        this.stats = stats;
      }
    )
  }
}
