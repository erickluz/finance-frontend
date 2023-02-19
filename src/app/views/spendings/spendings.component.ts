import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Spending } from "../../model/spending.model";
import { SpendingService } from "../spending.service";
import { Category } from "../../model/category.model";
import { CategoryService } from "../category.service";
import { CustomAdapter } from '../DateFormatter/CustomAdapter';
import { CustomDateParserFormatter } from '../DateFormatter/CustomDateParserFormatter';
import { NgbDateStruct, NgbDateParserFormatter, NgbDateAdapter  } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-spendings',
  templateUrl: './spendings.component.html',
  styleUrls: ['./spendings.component.scss'],
  providers: [
		{ provide: NgbDateAdapter, useClass: CustomAdapter },
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
	],
})
export class SpendingsComponent implements OnInit {
  states = ['normal', 'active', 'disabled'];
  colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
  idSpendingDelete : number = 0;
  date: NgbDateStruct = { year: 1789, month: 7, day: 14 }; // July, 14 1789
	model: NgbDateStruct= {
    "year": 2023,
    "month": 2,
    "day": 9
  };
  public visibleModalForm = false;
  public visibleModalDelete = false;
  spendings : Spending[] = [];
  categories : Category[] = [];

  private spending : Spending = new Spending("", "", "", "", "");

  public formSpending : FormGroup = this.formBuilder.group({
    id: [this.spending.id],
    name: [this.spending.name],
    idCategory: [this.spending.idCategory],
    date: [this.spending.date],
    model: [this.model],
    value: [this.spending.value]
  });

  constructor(private formBuilder: FormBuilder, private spendingService: SpendingService, private categorieService: CategoryService) { }

  ngOnInit() {
    this.getSpendings();
    this.getCategories();
  }

  private getSpendings() {
    this.spendingService.get().subscribe(
      (spending) => {
        this.spendings = spending;
        console.log(spending);
      }
    );
  }

  private getCategories() {
    this.categorieService.get().subscribe(
      (categories) => {
        this.categories = categories;
        console.log(categories);
      }
    );
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
    this.spending = new Spending("", "", "", "", "");

  }

  public onSubmit() {
    console.log(this.formSpending.value)
    this.spendingService.post(this.formSpending.value)
    .subscribe(() => {
      this.getSpendings();
    })
    this.formSpending.reset();
  }

  public deleteSpending() {
      this.spendingService.delete(this.idSpendingDelete).subscribe(
        () => {
          this.getSpendings();
        }
      );
  }

  public editSpending(id: string) {
    this.spendingService.findById(+id).subscribe(
      (spending) => {
        console.log(spending);
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
      value: [spending.value]
    });
  }
}
