import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Spending } from '../model/spending.model'
import {Datedto} from '../model/datedto.model'

@Injectable()
export class SpendingService {
  private url_api = 'http://localhost:8085/spending/'
  headers = new HttpHeaders(
    {'Content-Type':'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Credentials' : 'true'
  });
  requestOptions = { headers: this.headers };
  constructor(private http: HttpClient){}

  public post(spending: Spending) {
    return this.http.post<Spending>(this.url_api, spending, this.requestOptions)
  }

  public get(date: string) : Observable<Spending[]> {
    return this.http.get<Spending[]>(this.url_api + '?date=' + date, {
      headers: {'Access-Control-Allow-Origin':'*'}});
  }

  public delete(id: number) {
    return this.http.delete(this.url_api + id, this.requestOptions);
  }

  public findById(id: number) : Observable<Spending>  {
    return this.http.get<Spending>(this.url_api + id, this.requestOptions);
  }

  public getDates() : Observable<Datedto[]> {
    return this.http.get<Datedto[]>(this.url_api + 'dates', this.requestOptions);
  }

}
