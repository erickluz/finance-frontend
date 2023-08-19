import { Component,  } from '@angular/core';
import { ListItens } from '../list.itens';
import { ItemCheckSpending } from '../../model/item.check.spending.model';
import { SpendingCheck } from '../../model/spending.check.model';
import { SpendingCheckMonthService } from "../spending.check.month.service";
import { ActivatedRoute } from '@angular/router';
import { Datedto } from 'src/app/model/datedto.model';
import { SpendingCheckAssociation } from '../../model/spending.check.association.model'
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-spending-check-month',
  templateUrl: './spending-check-month.component.html',
  styleUrls: ['./spending-check-month.component.scss']
})
export class SpendingCheckMonthComponent {
  listItens : ListItens = new ListItens();
  listItens2 : ListItens = new ListItens();
  dates: Datedto[] = [];
  selectedDate: Datedto = new Datedto("", "", "");
  errorMessage: string = '';
  visible = false;
  public visibleModalCheck = false;
  index: any
  idSpendingCheckMonth : any
  idSpendingSelected : any
  actualDate : any
  formCheck : FormGroup;
  constructor(private spendingCheckMonthService: SpendingCheckMonthService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {
      this.formCheck = this.formBuilder.group({
        note: [''],
      });
  }

  ngOnInit() {
    this.idSpendingCheckMonth = this.activatedRoute.snapshot.params['id'];
    this.spendingCheckMonthService.findById(this.idSpendingCheckMonth).subscribe(scm => {
      this.actualDate = scm.date;
      this.getSpendingCheckAssociations(scm.date);
    })
  }

  private getSpendingCheckAssociations(date: string) {
      this.spendingCheckMonthService.getSpendingCheckAssociations(date)
      .subscribe({
        next: this.handleSpendingCheckAssociation.bind(this),
        error: this.handleError.bind(this)
     });
  }

  handleSpendingCheckAssociation(scas: SpendingCheckAssociation[]) {
    let spendings : ItemCheckSpending[] = [];
    let creditCardSpendings : ItemCheckSpending[] = [];
    scas.forEach(sca => {
      spendings.push(sca.spending)
      creditCardSpendings.push(sca.creditCardSpending)
    })
    this.listItens.list = spendings
    this.listItens2.list = creditCardSpendings;
  }

  handleError(error: HttpErrorResponse) {
    this.errorMessage = error.statusText;
    this.visible = !this.visible;
  }

  sizeList(list : any[] | undefined) : number {
    if (list === undefined) {
      return 0
    } else {
      return list.length;
    }
  }

  handleModalCheck(event: any) {
    this.visibleModalCheck = event;
  }

  public selectCheckSpending(idSpending: number) {
    this.idSpendingSelected = idSpending
    this.toggleModalCheck()
  }

  public selectToRemoveCheckSpending(idSpending: string) {
    this.idSpendingSelected = idSpending
    this.spendingCheckMonthService.removeCheckSpending(idSpending).subscribe(res => {
      this.getSpendingCheckAssociations(this.actualDate);
    });
  }

  public toggleModalCheck() {
    this.visibleModalCheck = !this.visibleModalCheck;
  }

  checkSpending() {
    let note = this.formCheck.controls['note'].value
    let spendingCheck : SpendingCheck = new SpendingCheck("", this.idSpendingSelected, this.idSpendingCheckMonth, note);

    this.spendingCheckMonthService.checkSpending(spendingCheck).subscribe(resp => {
      this.getSpendingCheckAssociations(this.actualDate);
    });

    this.toggleModalCheck();
  }
}
