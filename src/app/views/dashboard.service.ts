import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonthStats } from '../model/month.stats.model';
import { TotalsStats } from '../model/totals.stats.model';
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

  public getMonthStats(date?:string) : Observable<MonthStats> {
    let url : string = this.getUrl() + 'monthStats';
    if (date) {
      url = url + '?date=' + date;
    }
    return this.http.get<MonthStats>(url, this.requestOptions);
  }

  public getTotalsStats(initialDate:string, finalDate:string) : Observable<TotalsStats> {
    let url : string = this.getUrl() + 'totalsStats?initialDate=' + initialDate + '&finalDate=' + finalDate;
    return this.http.get<TotalsStats>(url, this.requestOptions);
  }

  public getBudgetChart(initialDate?: string, finalDate?: string) : Observable<BudgetChart> {
    let url = this.getUrl() + 'budgetChart';
    if (initialDate){
      url = url + '?initialDate=' + initialDate;
    }
    if (finalDate){
      url = url + '&finalDate=' + finalDate;
    }
    return this.http.get<BudgetChart>(url, this.requestOptions);
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
