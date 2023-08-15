import { Component } from '@angular/core';
import { ListItens } from '../list.itens';
import { SpendingCheckMonth } from '../../model/spending.check.month.model';
import { SpendingService } from "../spending.service";

@Component({
  selector: 'app-spending-check',
  templateUrl: './spending-check.component.html',
  styleUrls: ['./spending-check.component.scss']
})
export class SpendingCheckComponent {
  listItens : ListItens = new ListItens();
  spendingsCheckMonth : SpendingCheckMonth[] = [
    new SpendingCheckMonth("1", "July",  true),
    new SpendingCheckMonth("1", "August",  false)
  ]

  constructor(private spendingService: SpendingService) {
      this.listItens.list = this.spendingsCheckMonth;

  }

  sizeList(list : any[] | undefined) : number {
    if (list === undefined) {
      return 0
    } else {
      return list.length;
    }
  }

}
