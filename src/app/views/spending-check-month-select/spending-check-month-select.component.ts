import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpendingService } from "../spending.service";
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ListItens } from '../list.itens';
import { CreditCardSpending } from '../../model/credit.card.spending'

@Component({
  selector: 'app-spending-check-month-select',
  templateUrl: './spending-check-month-select.component.html',
  styleUrls: ['./spending-check-month-select.component.scss']
})
export class SpendingCheckMonthSelectComponent {
  spending : any
  formSpending : FormGroup;
  listItens : ListItens = new ListItens();
  spendingsCard : CreditCardSpending[] = [new CreditCardSpending('1', 'Feijoada', '19/04/1995', 200, 'A Vista')];

  constructor(private spendingService: SpendingService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {

    this.formSpending = this.formBuilder.group({
      id: [''],
      name: [''],
      idCategory: [''],
      idCard: [''],
      date: [''],
      value: [''],
      parts: ['']
    });
    this.listItens.list = this.spendingsCard;
  }


  ngOnInit() {
    let idSpending = this.activatedRoute.snapshot.params['id'];
    this.spendingService.findById(idSpending).subscribe(spending => {
      this.spending = spending;
      this.formSpending = this.formBuilder.group({
        id: [spending.id],
        name: [spending.name],
        idCategory: [spending.idCategory],
        idCard: [spending.idCard],
        date: [spending.date],
        value: [spending.value],
        parts: [spending.parts]
      });
    })
  }

  sizeList(list : any[] | undefined) : number {
    if (list === undefined) {
      return 0
    } else {
      return list.length;
    }
  }
}
