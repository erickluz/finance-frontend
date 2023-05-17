import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stats } from '../model/stats.model';
import { BudgetChart } from '../model/budget.chart.model';
import { SpendingCategory } from '../model/spending.category.chart.model';
import { Globals } from '../globals'
import { SpendingDayChart } from '../model/spending.day.chart.model'

@Injectable()
export class DashboardService {
  headers = new HttpHeaders(
    {'Content-Type':'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Credentials' : 'true'
  });
  requestOptions = { headers: this.headers };
  constructor(private http: HttpClient, private global: Globals){}

  getUrl() {
    return 'http://' + this.global.getServerUrl() + '/dashboard/';
  }

  public getStats() : Observable<Stats> {
    return this.http.get<Stats>(this.getUrl(), this.requestOptions);
  }

  public getBudgetChart() : Observable<BudgetChart> {
    return this.http.get<BudgetChart>(this.getUrl() + 'budget', this.requestOptions);
  }

  public getSpendingCategoryChart(initialDate?: string, finalDate?: string, budget?: string) : Observable<SpendingCategory> {
    let url = this.getUrl() + 'spendingchart';
    if (initialDate){
      url = url + '?initialDate=' + initialDate;
    }
    if (finalDate){
      url = url + '&finalDate=' + finalDate;
    }
    if (budget){
      url = url + '&budget=' + budget;
    }
    return this.http.get<SpendingCategory>(url, this.requestOptions);
  }

  public getSpendingPerDay() : Observable<SpendingDayChart> {
    return this.http.get<SpendingDayChart>(this.getUrl() + 'spendingByDay', this.requestOptions);
  }
}
