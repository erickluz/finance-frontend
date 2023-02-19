import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { TypeRevenueService } from '../type.revenue.service';
import { RevenueService } from '../revenue.service';
import { Revenue } from 'src/app/model/revenue.modal';
import { TypeRevenue } from 'src/app/model/type.revenue.model';
import { CustomAdapter } from '../DateFormatter/CustomAdapter';
import { CustomDateParserFormatter } from '../DateFormatter/CustomDateParserFormatter';
import { NgbDateStruct, NgbDateParserFormatter, NgbDateAdapter  } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-revenues',
  templateUrl: './revenues.component.html',
  styleUrls: ['./revenues.component.scss'],
  providers: [
		{ provide: NgbDateAdapter, useClass: CustomAdapter },
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
	],
})
export class RevenuesComponent implements OnInit {
	model: NgbDateStruct= {
    "year": 2023,
    "month": 2,
    "day": 9
  };
  revenue : Revenue = new Revenue("", "", "", "", "");
  public formRevenue : FormGroup = this.formBuilder.group({
    id: [this.revenue.id],
    idType: [this.revenue.idType],
    date: [this.revenue.date],
    model: [this.model],
    value: [this.revenue.value]
  });
  idRevenueDelete : number = 0;
  revenues : Revenue [] = [];
  typeRevenue : TypeRevenue [] = [];
  public visibleModalForm = false;
  public visibleModalDelete = false;

  constructor(private formBuilder: FormBuilder, private revenueService: RevenueService, private typeRevenueService: TypeRevenueService) {
    console.log('revenue')
  }

  ngOnInit() {
    this.getRevenues();
    this.getTypeRevenues();
  }

  private getRevenues() {
    this.revenueService.get().subscribe(
      (spending) => {
        this.revenues = spending;
        console.log(spending);
      }
    );
  }

  private getTypeRevenues() {
    this.typeRevenueService.get().subscribe(
      (typeRevenue) => {
        this.typeRevenue = typeRevenue;
        console.log(typeRevenue);
      }
    );
  }

  toggleModal() {
    this.visibleModalForm = !this.visibleModalForm;
  }

  handleLiveDemoChange(event: any) {
    this.visibleModalForm = event;
  }

  public toggleModalDelete(id: string) {
    if (id) {
      this.idRevenueDelete = +id;
    }
    this.visibleModalDelete = !this.visibleModalDelete;
  }

  handleModalDelete(event: any) {
    this.visibleModalDelete = event;
  }

  public newRevenue() {
    this.revenue = new Revenue("", "", "", "", "");

  }

  public editRevenue(id: string) {
    this.revenueService.findById(+id).subscribe(
      (revenue) => {
        console.log(revenue);
        this.revenue = revenue;
        this.createForm(revenue);
        this.visibleModalForm = true;
      });
  }

  createForm(revenue: Revenue) {
    this.formRevenue = this.formBuilder.group({
      id: [revenue.id],
      idType: [revenue.idType],
      date: [revenue.date],
      model: [this.model],
      value: [revenue.value]
    });
  }

  public onSubmit() {
    console.log(this.formRevenue.value)
    this.revenueService.post(this.formRevenue.value)
    .subscribe(() => {
      this.getRevenues();
    })
    this.formRevenue.reset();
  }

  public deleteRevenue() {
    this.revenueService.delete(this.idRevenueDelete).subscribe(
      () => {
        this.getRevenues();
      }
    );
}
}
