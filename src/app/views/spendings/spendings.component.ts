import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Spending } from "../../model/spending.model";
import { SpendingService } from "../spending.service";
import { Category } from "../../model/category.model";
import { Card } from "../../model/card.modal";
import { CategoryService } from "../category.service";
import { CardService } from "../card.service";
import { CustomAdapter } from '../DateFormatter/CustomAdapter';
import { CustomDateParserFormatter } from '../DateFormatter/CustomDateParserFormatter';
import { NgbDateStruct, NgbDateParserFormatter, NgbDateAdapter  } from '@ng-bootstrap/ng-bootstrap';
import { Datedto } from 'src/app/model/datedto.model';
import {ListItens} from '../list.itens';
import {FilterPipe} from '../filter.pipe';
import { HttpErrorResponse } from '@angular/common/http';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-spendings',
  templateUrl: './spendings.component.html',
  styleUrls: ['./spendings.component.scss'],
  providers: [
		{ provide: NgbDateAdapter, useClass: CustomAdapter },
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
	],
})
export class SpendingsComponent {
  visible = false;
  listItens : ListItens = new ListItens();
  idSpendingDelete : number = 0;
  selectedDate: Datedto = new Datedto("", "", "");
  selectedCard: Card = new Card("", "", "", "", "", "", false);
  dates: Datedto[] = [];
  dateVoid: Datedto = new Datedto("", "", "");
  listParts: number [] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  optionsFilterBudget : string [] = ["All", "Only budget", "No budget"];
  selectedFilterBudget : string = "All";
  public static filterBudget : string | undefined = "All";
  public static allCards : Card[];
  totalList  = 0;
  errorMessage: string = '';
  filteredSpendings : Spending[] | undefined = [];
  public visibleModalForm = false;
  public visibleModalDelete = false;
  spendings : Spending[] = [];
  categories : Category[] = [];
  cards : Card[] = [];
  private spending : Spending;
  save: boolean = false;
  lastDate: any

  formSpending : FormGroup;

  constructor(private formBuilder: FormBuilder,
              private spendingService: SpendingService,
              private categorieService: CategoryService,
              private cardService: CardService,
              private filter: FilterPipe) {
    this.spending = new Spending("", "", "", 0, "", formatDate(Date.now(),'dd/MM/yyyy','pt-BR'), "", "", "", "", false);
    this.listItens.list = this.spending;
    this.getDates();
    this.getCategories();
    this.formSpending = this.formBuilder.group({
      id: [this.spending.id],
      name: [this.spending.name],
      idCategory: [this.spending.idCategory],
      idCard: [this.spending.idCard],
      date: [this.spending.date],
      value: [this.spending.value],
      parts: [this.spending.parts]
    });
  }

  private getDates() {
    this.spendingService.getDates().subscribe(
      (dates) => {
        this.dates = dates;
        if (this.dates && !this.save) {
          for (let datedto of dates) {
            if (datedto.monthNumber == this.getActualMonth()
            && new Date(datedto.date).getFullYear().toString() == new Date().getFullYear().toString()) {
              this.selectedDate = datedto;
            }
          }
          this.getSpendings();
        }
        this.save = false
      }
    );
  }

  getActualMonth(): string {
    let tmp = new Date();
    return (tmp.getMonth() + 1).toString();
  }

  private async getSpendings() : Promise<any> {
    if (this.selectedDate.date) {
      this.spendingService.get(this.selectedDate.date)
      .subscribe({
        next: this.handleSpendingResponse.bind(this),
        error: this.handleError.bind(this)
     });
    } else {
      this.spendings = [];
    }
  }

  handleSpendingResponse(spending: Spending[]) {
    this.spendings = spending;
    this.listItens.list = spending
    this.getCards();
    this.calculateTotal(undefined);
  }

  private getCategories() {
    this.categorieService.get()
    .subscribe({
      next: this.handleCategoriesResponse.bind(this),
      error: this.handleError.bind(this)
   });

  }

  handleCategoriesResponse(categories: Category[]) {
    this.categories = categories;
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
    SpendingsComponent.allCards = this.cards;
  }

  handleError(error: HttpErrorResponse) {
    this.errorMessage = error.statusText;
    this.visible = !this.visible;
  }

  toggleLiveDemo() {
    this.visibleModalForm = !this.visibleModalForm;
  }

  handleLiveDemoChange(event: any) {
    this.visibleModalForm = event;
  }

  public toggleModalDelete(id: string) {
    if (id) {
      this.idSpendingDelete = +id;
    }
    this.visibleModalDelete = !this.visibleModalDelete;
  }

  handleModalDelete(event: any) {
    this.visibleModalDelete = event;
  }

  public newSpending() {
    this.formSpending.reset();
    this.spending = new Spending("", "", "", 0, "", formatDate(Date.now(),'dd/MM/yyyy','pt-BR'), "", "", "", "", false);
    this.createForm(this.spending)
  }

  public onSubmit() {
    if (this.spending.id) {
      this.updateSpending();
    } else {
      this.saveSpending();
    }
    this.formSpending.reset();
  }

  private saveSpending() {
    this.spendingService.post(this.formSpending.value)
      .subscribe(() => {
        this.save = true;
        this.getDates();
        this.getSpendings();
      });
  }

  private updateSpending() {
    this.spendingService.put(this.formSpending.value)
      .subscribe(() => {
        this.save = true;
        this.getDates();
        this.getSpendings();
      });
  }

  public deleteSpending() {
      this.spendingService.delete(this.idSpendingDelete).subscribe(
        () => {
          this.getDates();
          this.getSpendings();
        }
      );
  }

  public editSpending(id: string) {
    this.spendingService.findById(+id).subscribe(
      (spending) => {
        this.spending = spending;
        this.createForm(spending);
        this.visibleModalForm = true;
      });
  }

  createForm(spending: Spending) {
    if (spending.type == 3)
      spending.name = spending.namePart
    this.formSpending = this.formBuilder.group({
      id: [spending.id],
      name: [spending.name],
      idCategory: [spending.idCategory],
      idCard: [spending.idCard],
      date: [spending.date],
      value: [spending.value],
      parts: [spending.parts]
    });
  }

  changeDate() {
    this.getSpendings();
  }

  changeBudgetFilter() {
    this.getSpendings().then( () => {
      SpendingsComponent.filterBudget = this.selectedFilterBudget;
      this.calculate(undefined);
    })
  }

  calculateTotal(event?: Event) {
    let filterValue = (event) ? (event?.target as HTMLInputElement).value : '';
    this.calculate(filterValue);
  }

  private calculate(filterValue: string | undefined) {
    this.filteredSpendings = this.filter.transform(this.listItens.list, filterValue);
    this.totalList = 0;
    if (this.filteredSpendings) {
      for (let spending of this.filteredSpendings) {
        let value = spending.value.substring(3);
        this.totalList = this.totalList + +value;
      }
    }
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
  }

  sizeList(list : any[] | undefined) : number {
    if (list === undefined) {
      return 0
    } else {
      return list.length;
    }
  }
}
