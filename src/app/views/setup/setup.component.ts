import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Globals } from 'src/app/globals';
import {CookieService} from '../cookie.service'

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent {
  cookie : CookieService = new CookieService;
  server_url : string = this.global.getServerUrl();
  formSetup: FormGroup;

  constructor(private formBuilder: FormBuilder,  private global: Globals) {
    let urlCookie = this.cookie.getCookie('server_url');
    console.log('COOKIE: ' + urlCookie);
    if(urlCookie != ' ' && urlCookie != ''){
      this.server_url = urlCookie;
      console.log('pegando url do Cookie')
    }
    this.formSetup = this.formBuilder.group({
      server_url: [this.server_url]
    });
  }

  onSubmit() {
    this.global.setServerUrl(this.formSetup.value.server_url);
    console.log("url configurada: " + this.global.getServerUrl())
  }
}
