import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Budget } from '../model/budget.model'
import { Globals } from '../globals'

@Injectable()
export class BudgetService {
  headers = new HttpHeaders(
    {'Content-Type':'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': this.getUrl(),
    'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Credentials' : 'true'
  });
  requestOptions = { headers: this.headers };
  constructor(private http: HttpClient, private global: Globals){}

  getUrl() {
    return 'http://' + this.global.getServerUrl() + '/budget/';
  }

  public post(Budget: Budget) {

    return this.http.post<Budget>(this.getUrl(), Budget, this.requestOptions)
  }

  public get() : Observable<Budget[]> {
    return this.http.get<Budget[]>(this.getUrl(), {
      headers: {'Access-Control-Allow-Origin':'*'}});
  }

  public delete(id: number) {
    return this.http.delete(this.getUrl() + id, this.requestOptions);
  }

  public findById(id: number) : Observable<Budget>  {
    return this.http.get<Budget>(this.getUrl() + id, this.requestOptions);
  }

}
