import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeRevenue } from '../model/type.revenue.model';

@Injectable()
export class TypeRevenueService {
  private url_api = 'http://localhost:8085/typeRevenue/'
  headers = new HttpHeaders(
    {'Content-Type':'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Credentials' : 'true'
  });
  requestOptions = { headers: this.headers };
  constructor(private http: HttpClient){}

  public post(spending: TypeRevenue) {
    return this.http.post<TypeRevenue>(this.url_api, spending, this.requestOptions)
  }

  public get() : Observable<TypeRevenue[]> {
    return this.http.get<TypeRevenue[]>(this.url_api, {
      headers: {'Access-Control-Allow-Origin':'*'}});
  }

  public delete(id: number) {
    return this.http.delete(this.url_api + id, this.requestOptions);
  }

  public findById(id: number) : Observable<TypeRevenue>  {
    return this.http.get<TypeRevenue>(this.url_api + id, this.requestOptions);
  }
}
