import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model'
import { Globals } from '../globals'

@Injectable()
export class CategoryService {
  headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

  constructor(private http: HttpClient, private global: Globals){}

  getUrl() {
    return 'http://' + this.global.getServerUrl() + '/category/';
  }

  public post(category: Category) {
    const headers = new HttpHeaders(
      {'Content-Type':'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': this.getUrl(),
      'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Credentials' : 'true'
    });
    const requestOptions = { headers: headers };
    return this.http.post<Category>(this.getUrl(), category, requestOptions)
  }

  public get() : Observable<Category[]> {
    return this.http.get<Category[]>(this.getUrl(), {
      headers: {'Access-Control-Allow-Origin':'*'}});
  }

  public delete(id: number) {
    this.http.delete(this.getUrl() + "/" + id,{
      headers: {'Access-Control-Allow-Origin':'*'}});
  }

}
