import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Spending } from '../model/spending.model'
import { Datedto } from '../model/datedto.model'
import { Globals } from '../globals'

@Injectable()
export class SpendingService {
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
    return 'http://' + this.global.getServerUrl() + '/spending/';
  }

  public post(spending: Spending) {
    return this.http.post<Spending>(this.getUrl(), spending, this.requestOptions)
  }

  public put(spending: Spending) {
    return this.http.put<Spending>(this.getUrl(), spending, this.requestOptions)
  }

  public get(date: string) : Observable<Spending[]> {
    return this.http.get<Spending[]>(this.getUrl() + '?date=' + date, {
      headers: {'Access-Control-Allow-Origin':'*'}});
  }

  public delete(id: number) {
    return this.http.delete(this.getUrl() + id, this.requestOptions);
  }

  public findById(id: number) : Observable<Spending>  {
    return this.http.get<Spending>(this.getUrl() + id, this.requestOptions);
  }

  public getDates() : Observable<Datedto[]> {
    return this.http.get<Datedto[]>(this.getUrl() + 'dates', this.requestOptions);
  }

}
