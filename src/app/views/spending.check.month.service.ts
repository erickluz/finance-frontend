import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpendingCheckMonth } from '../model/spending.check.month.model'
import { SpendingCheck } from '../model/spending.check.model'
import { SpendingCheckAssociation } from '../model/spending.check.association.model'
import { AssociationsIDSDTO } from '../model/associations.ids.model';
import { Datedto } from '../model/datedto.model'
import { Globals } from '../globals'

@Injectable()
export class SpendingCheckMonthService {
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
    return 'http://' + this.global.getServerUrl() + '/spendingCheckMonth/';
  }

  public post(spending: SpendingCheckMonth) {
    return this.http.post<SpendingCheckMonth>(this.getUrl(), spending, this.requestOptions)
  }

  public put(spending: SpendingCheckMonth) {
    return this.http.put<SpendingCheckMonth>(this.getUrl(), spending, this.requestOptions)
  }

  public get() : Observable<SpendingCheckMonth[]> {
    return this.http.get<SpendingCheckMonth[]>(this.getUrl() , this.requestOptions);
  }

  public delete(id: number) {
    return this.http.delete(this.getUrl() + id, this.requestOptions);
  }

  public findById(id: number) : Observable<SpendingCheckMonth>  {
    return this.http.get<SpendingCheckMonth>(this.getUrl() + id, this.requestOptions);
  }

  public getSpendingCheckAssociations(date : string) : Observable<SpendingCheckAssociation[]> {
    return this.http.get<SpendingCheckAssociation[]>(this.getUrl() + 'associations?date=' + date, this.requestOptions);
  }

  public checkSpending(spendingCheck: SpendingCheck) {
    return this.http.post<SpendingCheck>(this.getUrl() + 'check', spendingCheck, this.requestOptions)
  }

  public removeCheckSpending(idSpending : string) {
    return this.http.delete(this.getUrl() + 'removeCheck/' + idSpending, this.requestOptions)
  }

  public associate(ids: AssociationsIDSDTO) {
    return this.http.post<AssociationsIDSDTO>(this.getUrl() + 'associate', ids, this.requestOptions)
  }

  public desassociate(ids: AssociationsIDSDTO) {
    return this.http.post<AssociationsIDSDTO>(this.getUrl() + 'desassociate', ids, this.requestOptions)
  }

  public auto(date : string) {
    return this.http.post<AssociationsIDSDTO>(this.getUrl() + 'auto', date, this.requestOptions)
  }

}
