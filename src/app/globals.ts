import { Injectable } from '@angular/core';
import {CookieService} from './views/cookie.service'

@Injectable()
export class Globals{
  private cookie: CookieService = new CookieService();

  constructor(){}

  public getServerUrl(): string {
    let urlCookie = this.cookie.getCookie('server_url');
    if(urlCookie == ' ' || urlCookie == ''){
      urlCookie = 'localhost:8085';
    }
    return urlCookie;
  }

  public setServerUrl(server_url : string) {
    this.cookie.setCookie('server_url', server_url, 10);
  }
}
