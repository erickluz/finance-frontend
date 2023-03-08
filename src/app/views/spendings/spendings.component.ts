import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Spending } from "../../model/spending.model";
import { SpendingService } from "../spending.service";
import { Category } from "../../model/category.model";
import { CategoryService } from "../category.service";
import { CustomAdapter } from '../DateFormatter/CustomAdapter';
import { CustomDateParserFormatter } from '../DateFormatter/CustomDateParserFormatter';
import { NgbDateStruct, NgbDateParserFormatter, NgbDateAdapter  } from '@ng-bootstrap/ng-bootstrap';
import { Datedto } from 'src/app/model/datedto.model';
import {ListItens} from '../list.itens';
import {FilterPipe} from '../filter.pipe';
import { HttpErrorResponse } from '@angular/common/http';

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
  dates: Datedto[] = [];
  dateVoid: Datedto = new Datedto("", "", "");
  parts : number [] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  totalList  = 0;
  errorMessage: string = '';
	model: NgbDateStruct= {
    "year": 2023,
    "month": 2,
    "day": 9
  };
  filteredSpendings : Spending[] = [];
  public visibleModalForm = false;
  public visibleModalDelete = false;
  spendings : Spending[] = [];
  categories : Category[] = [];
  private spending : Spending = new Spending("", "", "", "", "", "");
  save: boolean = false;
  lastDate: any

  public formSpending : FormGroup = this.formBuilder.group({
    id: [this.spending.id],
    name: [this.spending.name],
    idCategory: [this.spending.idCategory],
    date: [this.spending.date],
    model: [this.model],
    value: [this.spending.value],
    parts: [this.parts]
  });

  constructor(private formBuilder: FormBuilder,
              private spendingService: SpendingService,
              private categorieService: CategoryService,
              private filter: FilterPipe) {
    this.listItens.list = this.spending;
    this.getDates();
    this.getCategories();
  }

  private getDates() {
    this.spendingService.getDates().subscribe(
      (dates) => {
        this.dates = dates;
        if (this.dates && !this.save) {
          for (let datedto of dates) {
            if (datedto.monthNumber == this.getActualMonth(datedto.monthNumber)) {
              this.selectedDate = datedto;
            }
          }
          this.getSpendings();
        }
        this.save = false
      }
    );
  }

  getActualMonth(sdate: string): string {
    let tmp = new Date();
    return (tmp.getMonth() + 1).toString();
  }

  private getSpendings() {
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
    this.spending = new Spending("", "", "", "", "", "");

  }

  public onSubmit() {
    console.log(this.formSpending.value)
    this.spendingService.post(this.formSpending.value)
    .subscribe(() => {
      this.save = true;
      this.getDates();
      this.getSpendings();
    })
    this.formSpending.reset();
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
    this.formSpending = this.formBuilder.group({
      id: [spending.id],
      name: [spending.name],
      idCategory: [spending.idCategory],
      date: [spending.date],
      model: [this.model],
      value: [spending.value],
      parts: [spending.parts]
    });
  }

  changeDate() {
    this.getSpendings();
  }

  calculateTotal(event?: Event) {
    let filterValue = (event) ? (event?.target as HTMLInputElement).value : '';
    this.filteredSpendings = this.filter.transform(this.listItens.list, filterValue);
    this.totalList = 0;
    for (let spending of this.filteredSpendings) {
      let value = spending.value.substring(3);
      this.totalList = this.totalList + +value;
    }
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
  }
}
