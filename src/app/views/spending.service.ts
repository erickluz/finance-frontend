import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Spending } from '../model/spending.model'

@Injectable()
export class SpendingService {
  private url_api = 'http://localhost:8085/spending/'
  headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});


  constructor(private http: HttpClient){}

  public post(spending: Spending) {
    const headers = new HttpHeaders(
      {'Content-Type':'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': this.url_api,
      'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Credentials' : 'true'
    });
    const requestOptions = { headers: headers };
    console.log('POST')
    return this.http.post<Spending>(this.url_api, spending, requestOptions)
  }

  public get() : Observable<Spending[]> {
    return this.http.get<Spending[]>(this.url_api, {
      headers: {'Access-Control-Allow-Origin':'*'}});
  }

  public delete(id: number) {
    this.http.delete(this.url_api + "/" + id,{
      headers: {'Access-Control-Allow-Origin':'*'}});
  }

}
