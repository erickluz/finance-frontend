import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Revenue } from '../model/revenue.modal';
import { Globals } from '../globals'

@Injectable()
export class RevenueService {
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
    return 'http://' + this.global.getServerUrl() + '/revenue/';
  }

  public post(spending: Revenue) {
    return this.http.post<Revenue>(this.getUrl(), spending, this.requestOptions)
  }

  public get() : Observable<Revenue[]> {
    return this.http.get<Revenue[]>(this.getUrl(), {
      headers: {'Access-Control-Allow-Origin':'*'}});
  }

  public delete(id: number) {
    return this.http.delete(this.getUrl() + id, this.requestOptions);
  }

  public findById(id: number) : Observable<Revenue>  {
    return this.http.get<Revenue>(this.getUrl() + id, this.requestOptions);
  }
}
