import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../model/card.modal';
import { Globals } from '../globals'

@Injectable()
export class CardService {
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
    return 'http://' + this.global.getServerUrl() + '/card/';
  }

  public post(spending: Card) {
    return this.http.post<Card>(this.getUrl(), spending, this.requestOptions)
  }

  public get() : Observable<Card[]> {
    return this.http.get<Card[]>(this.getUrl(), {
      headers: {'Access-Control-Allow-Origin':'*'}});
  }

  public delete(id: number) {
    return this.http.delete(this.getUrl() + id, this.requestOptions);
  }

  public findById(id: number) : Observable<Card>  {
    return this.http.get<Card>(this.getUrl() + id, this.requestOptions);
  }
}
