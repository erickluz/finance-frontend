import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeRevenue } from '../model/type.revenue.model';
import { Globals } from '../globals'

@Injectable()
export class TypeRevenueService {
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
    return 'http://' + this.global.getServerUrl() + '/typeRevenue/';
  }

  public post(spending: TypeRevenue) {
    return this.http.post<TypeRevenue>(this.getUrl(), spending, this.requestOptions)
  }

  public get() : Observable<TypeRevenue[]> {
    return this.http.get<TypeRevenue[]>(this.getUrl(), {
      headers: {'Access-Control-Allow-Origin':'*'}});
  }

  public delete(id: number) {
    return this.http.delete(this.getUrl() + id, this.requestOptions);
  }

  public findById(id: number) : Observable<TypeRevenue>  {
    return this.http.get<TypeRevenue>(this.getUrl() + id, this.requestOptions);
  }
}
