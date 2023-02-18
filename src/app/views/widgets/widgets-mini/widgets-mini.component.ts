import { Component } from '@angular/core';
import { cilChartPie, cilArrowTop, cilArrowBottom, cilDollar } from '@coreui/icons';


@Component({
  selector: 'app-widgets-mini',
  templateUrl: './widgets-mini.component.html',
  styleUrls: ['./widgets-mini.component.scss']
})
export class WidgetsMiniComponent {
  icons = { cilChartPie, cilArrowTop, cilArrowBottom, cilDollar };


}
