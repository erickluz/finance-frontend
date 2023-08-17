import { Component } from '@angular/core';
import { ListItens } from '../list.itens';
import { SpendingCheckMonth } from '../../model/spending.check.month.model';
import { CreditCardBill } from '../../model/credit.card.bill.model';
import { CardService } from "../card.service";
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Card } from "../../model/card.modal";
import { HttpErrorResponse } from '@angular/common/http';
import {formatDate} from '@angular/common';
import { CustomDateParserFormatter } from '../DateFormatter/CustomDateParserFormatter';
import { NgbDateStruct, NgbDateParserFormatter, NgbDateAdapter  } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter } from '../DateFormatter/CustomAdapter';

@Component({
  selector: 'app-spending-check',
  templateUrl: './spending-check.component.html',
  styleUrls: ['./spending-check.component.scss'],
  providers: [
		{ provide: NgbDateAdapter, useClass: CustomAdapter },
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
	],
})
export class SpendingCheckComponent {
  listItens : ListItens = new ListItens();
  errorMessage: string = '';
  visible = false;
  formCreditCardBill : FormGroup;
  formFile : FormGroup;
  cards : Card[] = [];
  private file : any;
  public static allCards : Card[];
  public visibleModalUpload = false;
  spendingsCheckMonth : SpendingCheckMonth[] = [
    new SpendingCheckMonth("1", "July",  true),
    new SpendingCheckMonth("1", "August",  false)
  ]

  constructor(private cardService: CardService, private formBuilder: FormBuilder,) {
      this.listItens.list = this.spendingsCheckMonth;
      this.getCards();
      // let creditCardBill : CreditCardBill = new CreditCardBill(null, formatDate(Date.now(),'dd/MM/yyyy','pt-BR'), null, null)
      this.formCreditCardBill = this.formBuilder.group({
        id: [''],
        dueDate: [formatDate(Date.now(),'dd/MM/yyyy','pt-BR')],
        uploadFileDate: [''],
        idCard: [''],
      });
      this.formFile = this.formBuilder.group({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        file: new FormControl('', [Validators.required]),
        fileSource: new FormControl('', [Validators.required])
      });
  }

  get f(){
    return this.formFile.controls;
  }

  onFileChange(event?: Event) {
    if (event && event.target && event.target) {
      let element = (event.target as HTMLInputElement)
      if (element && element.files) {
        if (element.files.length > 0) {
          console.log(element.files.length)
          this.file = element.files[0];
          console.log('File setup')
        }
      }
    }
  }

  public toggleModalUpload() {
    this.visibleModalUpload = !this.visibleModalUpload;
  }

  public uploadFile() {
    console.log(this.formCreditCardBill.value)
    this.cardService.postCreditCardBill(this.formCreditCardBill.value)
    .subscribe((response) => {
        let formParams = new FormData();
        let idCreditBill : string = response.toString();
        formParams.append('idCreditBill', idCreditBill)
        formParams.append('file', this.file)
        this.cardService.postFile(formParams)
        .subscribe(res => {
          console.log('File sent')
        })
      }
    )
  }

  sizeList(list : any[] | undefined) : number {
    if (list === undefined) {
      return 0
    } else {
      return list.length;
    }
  }

  handleModalDelete(event: any) {
    this.visibleModalUpload = event;
  }

  private getCards() {
    this.cardService.get()
    .subscribe({
      next: this.handleCardResponse.bind(this),
      error: this.handleError.bind(this)
   });
  }

  handleCardResponse(cards: Card[]) {
    this.cards = cards;
    SpendingCheckComponent.allCards = this.cards;
  }

  handleError(error: HttpErrorResponse) {
    this.errorMessage = error.statusText;
    this.visible = !this.visible;
  }
}
