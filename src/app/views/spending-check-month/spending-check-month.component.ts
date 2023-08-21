import { Component,  } from '@angular/core';
import { ListItens } from '../list.itens';
import { ItemCheckSpending } from '../../model/item.check.spending.model';
import { SpendingCheck } from '../../model/spending.check.model';
import { AssociationsIDSDTO } from '../../model/associations.ids.model';
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
  associationsIDSDTO : AssociationsIDSDTO = new AssociationsIDSDTO(0, [], []);
  spendings : ItemCheckSpending[] = [];
  creditCardSpendings : ItemCheckSpending[] = [];
  optionsFilterAssociation : string [] = ["All", "Associated", "Unassociated"];
  selectedFilterAssociation : string = "Unassociated";
  optionsFilterAssociable : string [] = ["All", "Is Associable", "No Associable"];
  selectedFilterAssociable : string = "Is Associable";
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
      this.spendingCheckMonthService.getSpendingCheckAssociations(date, this.selectedFilterAssociable, this.selectedFilterAssociation)
      .subscribe({
        next: this.handleSpendingCheckAssociation.bind(this),
        error: this.handleError.bind(this)
     });
  }

  handleSpendingCheckAssociation(scas: SpendingCheckAssociation[]) {
    this.spendings = []
    this.creditCardSpendings = []
    this.listItens.list = []
    this.listItens2.list = []
    scas.forEach(sca => {
      this.spendings.push(sca.spending)
      this.creditCardSpendings.push(sca.creditCardSpending)
    })
    this.listItens.list = this.spendings
    this.listItens2.list = this.creditCardSpendings;
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

  checkSpendingChange(values:any, i : number):void {
    this.spendings[i].checked = values.target.checked
  }

  checkCreditCardChange(values:any, i : number):void {
    this.creditCardSpendings[i].checked = values.target.checked
  }

  auto() {
    this.spendingCheckMonthService.auto(this.actualDate).subscribe(res => {
      this.getSpendingCheckAssociations(this.actualDate);
    })
  }

  associar() {
    this.associationsIDSDTO = new AssociationsIDSDTO(0, [], []);
    this.associationsIDSDTO.idSpendingCheckMonth = this.idSpendingCheckMonth
    this.spendings.forEach (s => {
      if (s.checked && s.isAssociable){
        this.associationsIDSDTO.spendingsIds.push(+s.id)
      }
    })
    this.creditCardSpendings.forEach (ccs => {
      if (ccs.checked && ccs.isAssociable){
        this.associationsIDSDTO.creditCardIds.push(+ccs.id)
      }
    })
    this.spendingCheckMonthService.associate(this.associationsIDSDTO).subscribe(res => {
      this.getSpendingCheckAssociations(this.actualDate);
    })
  }

  desassociar() {
    this.associationsIDSDTO = new AssociationsIDSDTO(0, [], []);
    this.associationsIDSDTO.idSpendingCheckMonth = this.idSpendingCheckMonth
    this.spendings.forEach (s => {
      if (s.checked && s.isAssociable){
        this.associationsIDSDTO.spendingsIds.push(+s.id)
      }
    })
    this.creditCardSpendings.forEach (ccs => {
      if (ccs.checked && ccs.isAssociable){
        this.associationsIDSDTO.creditCardIds.push(+ccs.id)
      }
    })
    this.spendingCheckMonthService.desassociate(this.associationsIDSDTO).subscribe(res => {
      this.getSpendingCheckAssociations(this.actualDate);
    })
  }

  changeFilterAssociation() {
    this.getSpendingCheckAssociations(this.actualDate);
  }

  changeFilterAssociable() {
    this.getSpendingCheckAssociations(this.actualDate);
  }
}
