import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Spending } from "../../model/spending.model";
import { SpendingService } from "../spending.service";

@Component({
  selector: 'app-spendings',
  templateUrl: './spendings.component.html',
  styleUrls: ['./spendings.component.scss']
})
export class SpendingsComponent implements OnInit {
  states = ['normal', 'active', 'disabled'];
  colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

  public visible = false;
  spendings : Spending[] = [];

  private spending : Spending = new Spending("", "", "", "", "");
  public formSpending : FormGroup= this.formBuilder.group({
    id: [this.spending.id],
    name: [this.spending.name],
    idCategory: [this.spending.idCategory],
    date: [this.spending.date],
    value: [this.spending.value]
  });

  constructor(private formBuilder: FormBuilder, private service: SpendingService) { }

  ngOnInit() {
    // this.service.get().subscribe(
    //   (spending) => {
    //     this.spendings = spending
    //     console.log(spending);
    //   }
    // );
  }

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }


  public onSubmit() {
    console.log(this.formSpending.value)
    this.service.post(this.formSpending.value)
    .subscribe()
  }
}
