import { Component } from '@angular/core';
import { cilChartPie, cilArrowTop, cilArrowBottom, cilDollar } from '@coreui/icons';
import { Stats } from 'src/app/model/stats.model';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-widgets-mini',
  templateUrl: './widgets-mini.component.html',
  styleUrls: ['./widgets-mini.component.scss']
})
export class WidgetsMiniComponent {
  icons = { cilChartPie, cilArrowTop, cilArrowBottom, cilDollar };
  stats: Stats = new Stats("R$ 0,00", "R$ 0,00", "0 %", "R$ 0,00");

  constructor(private dashboardService: DashboardService) {
    dashboardService.getStats().subscribe(
      (stats) => {
        this.stats = stats;
      }
    )
  }
}
