import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stats } from '../model/stats.model';
import { BudgetChart } from '../model/budget.chart.model';
import { SpendingCategory } from '../model/spending.category.chart.model';

@Injectable()
export class DashboardService {
  private url_api = 'http://localhost:8085/dashboard/'
  headers = new HttpHeaders(
    {'Content-Type':'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Credentials' : 'true'
  });
  requestOptions = { headers: this.headers };
  constructor(private http: HttpClient){}

  public getStats() : Observable<Stats> {
    return this.http.get<Stats>(this.url_api, this.requestOptions);
  }

  public getBudgetChart() : Observable<BudgetChart> {
    return this.http.get<BudgetChart>(this.url_api + 'budget', this.requestOptions);
  }

  public getSpendingCategoryChart() : Observable<SpendingCategory> {
    return this.http.get<SpendingCategory>(this.url_api + 'spendingchart', this.requestOptions);
  }
}
