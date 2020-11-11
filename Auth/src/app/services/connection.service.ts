import { global } from './global';
import { User } from './../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  url = global.url;
  token;
  identity;
  constructor(private _http: HttpClient) {}

  register(user: User) {
    var params = JSON.stringify(user);
    var headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.post(`${this.url}/register`, params, { headers });
  }

  login(user, gettoken = null):Observable<any> {
    if (gettoken != null) {
      user.gettoken = gettoken;
    }
    var params = JSON.stringify(user);
    var headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.post(`${this.url}/login`, params, { headers });
  }

  getIdentity(){

    let identity=JSON.parse(localStorage.getItem('identity'));

    if(!identity || [null,undefined].indexOf(identity) >= 0){
      this.identity=null;
    }else{
      this.identity=identity;
    }

    return this.identity;

  }
  
  getToken(){

    let token=localStorage.getItem('token');

    if(!token || [null,undefined].indexOf(token)>=0){
      this.token=null;
    }else{
      this.token=token;
    }

    return this.token;
  }
}
