import { Component } from '@angular/core';
import {ListItens} from '../list.itens';
import { Budget } from 'src/app/model/budget.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BudgetService } from "../budget.service";
import { FilterPipe } from '../filter.pipe';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomAdapter } from '../DateFormatter/CustomAdapter';
import { CustomDateParserFormatter } from '../DateFormatter/CustomDateParserFormatter';
import { NgbDateStruct, NgbDateParserFormatter, NgbDateAdapter  } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
  providers: [
		{ provide: NgbDateAdapter, useClass: CustomAdapter },
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
	],
})
export class BudgetComponent {
  listItens : ListItens = new ListItens();
  visible = false;
  idBudgetDelete : number = 0;
  public visibleModalForm = false;
  private budget : Budget = new Budget(0, "", "", 0);
  public visibleModalDelete = false;
  errorMessage: string = '';
  budgets : Budget[] = [];
  save: boolean = false;
  model: NgbDateStruct= {
    "year": 2023,
    "month": 2,
    "day": 9
  };

  public formBudget : FormGroup = this.formBuilder.group({
    id: [this.budget.id],
    date: [this.budget.date],
    value: [this.budget.value]
  });

  constructor(private formBuilder: FormBuilder,
    private budgetService: BudgetService,
    private filter: FilterPipe) {
    this.listItens.list = this.budget;
    this.getCategories();
  }

  private getCategories() {
    this.budgetService.get()
    .subscribe({
      next: this.handleCategoriesResponse.bind(this),
      error: this.handleError.bind(this)
   });

  }

  handleCategoriesResponse(budgets: Budget[]) {
    this.budgets = budgets;
    this.listItens.list = budgets;
  }

  handleError(error: HttpErrorResponse) {
    this.errorMessage = error.statusText;
    this.visible = !this.visible;
  }

  newBudget() {

  }

  toggleLiveDemo() {
    this.visibleModalForm = !this.visibleModalForm;
  }

  sizeList(list : any[] | undefined) : number {
    if (list === undefined) {
      return 0
    } else {
      return list.length;
    }
  }

  public editBudget(id: string) {
    this.budgetService.findById(+id).subscribe(
      (budget) => {
        this.budget = budget;
        this.createForm(budget);
        this.visibleModalForm = true;
      });
  }

  public toggleModalDelete(id: string) {
    if (id) {
      this.idBudgetDelete = +id;
    }
    this.visibleModalDelete = !this.visibleModalDelete;
  }

  createForm(budget: Budget) {
    this.formBudget = this.formBuilder.group({
      id: [budget.id],
      date: [budget.date],
      value: [budget.value]
    });
  }

  public onSubmit() {
    this.budgetService.post(this.formBudget.value)
    .subscribe(() => {
      this.save = true;
      this.getCategories();
    })
    this.formBudget.reset();
  }

  handleLiveDemoChange(event: any) {
    this.visibleModalForm = event;
  }

  public deleteBudget() {
    this.budgetService.delete(this.idBudgetDelete).subscribe(
      () => {
        this.getCategories();
      }
    );
  }

  handleModalDelete(event: any) {
    this.visibleModalDelete = event;
  }
}
