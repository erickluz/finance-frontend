import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Spending } from "../../model/spending.model";
import { SpendingService } from "../spending.service";
import { Category } from "../../model/category.model";
import { CategoryService } from "../category.service";

import { NgbPaginationModule, NgbAlertModule, NgbDatepicker, NgbDateStruct, NgbInputDatepicker, NgbDatepickerModule, NgbCalendar, NgbDateParserFormatter, NgbDateAdapter  } from '@ng-bootstrap/ng-bootstrap';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
	readonly DELIMITER = '/';

	fromModel(value: string | null): NgbDateStruct | null {
		if (value) {
			const date = value.toString().split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

  handleDayMomth(number: number) : string  {
    return (number < 10) ? '0' + number : number.toString();
  }

	toModel(date: NgbDateStruct | null): string | null {
		return date ? this.handleDayMomth(date.day) + this.DELIMITER + this.handleDayMomth(date.month) + this.DELIMITER + date.year : null;
	}

}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
	readonly DELIMITER = '/';

	parse(value: string): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

  handleDayMonth(number: number) : string  {
    return (number < 10) ? '0' + number : number.toString();
  }

	format(date: NgbDateStruct | null): string {
		return date ? this.handleDayMonth(date.day) + this.DELIMITER + this.handleDayMonth(date.month) + this.DELIMITER + date.year : '';
	}
}

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
