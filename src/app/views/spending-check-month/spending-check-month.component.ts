import { Component,  } from '@angular/core';
import { ListItens } from '../list.itens';
import { SpendingCheck } from '../../model/spending.check.model';
import { SpendingService } from "../spending.service";
import { ActivatedRoute } from '@angular/router';
import { Datedto } from 'src/app/model/datedto.model';


@Component({
  selector: 'app-spending-check-month',
  templateUrl: './spending-check-month.component.html',
  styleUrls: ['./spending-check-month.component.scss']
})
export class SpendingCheckMonthComponent {
  listItens : ListItens = new ListItens();
  dates: Datedto[] = [];
  selectedDate: Datedto = new Datedto("", "", "");


  spendingsCheck : SpendingCheck[] = [
    new SpendingCheck("341", "pastel", "19/04/1995", "XP Investimentos", 200, true),
    new SpendingCheck("345", "Ração", "19/04/1995", "VR", 60, false)
  ]

  constructor(private spendingService: SpendingService, private activatedRoute: ActivatedRoute) {
    this.listItens.list = this.spendingsCheck;


  }

  // private getDates() {
  //   this.spendingService.getDates().subscribe(
  //     (dates) => {
  //       this.dates = dates;
  //       if (this.dates && !this.save) {
  //         for (let datedto of dates) {
  //           if (datedto.monthNumber == this.getActualMonth()
  //           && new Date(datedto.date).getFullYear().toString() == new Date().getFullYear().toString()) {
  //             this.selectedDate = datedto;
  //           }
  //         }
  //         this.getSpendings();
  //       }
  //       this.save = false
  //     }
  //   );
  // }

  // private async getSpendings() : Promise<any> {
  //   if (this.selectedDate.date) {
  //     this.spendingService.get(this.selectedDate.date)
  //     .subscribe({
  //       next: this.handleSpendingResponse.bind(this),
  //       error: this.handleError.bind(this)
  //    });
  //   } else {
  //     this.spendings = [];
  //   }
  // }

  // handleSpendingResponse(spending: Spending[]) {
  //   this.spendings = spending;
  //   this.listItens.list = spending
  //   this.getCards();
  //   this.calculateTotal(undefined);
  // }

  // private getCategories() {
  //   this.categorieService.get()
  //   .subscribe({
  //     next: this.handleCategoriesResponse.bind(this),
  //     error: this.handleError.bind(this)
  //  });

  // }

  sizeList(list : any[] | undefined) : number {
    if (list === undefined) {
      return 0
    } else {
      return list.length;
    }
  }
}
