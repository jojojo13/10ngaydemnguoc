import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Account } from '../models/Account';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeService {
  public userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  constructor(private _http: HttpClient) {
    this.userSubject = new BehaviorSubject<any>(null);
    this.user = this.userSubject.asObservable();
  }

  signIn(account: Account) {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    });

    return this._http.post(
      'https://capsum22.herokuapp.com/api/AccountAPI/GetAccount',
      account,
      { headers: headers}
    );
  }
  getUserInfo() {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this._http.get(
      'https://capsum22.herokuapp.com/api/AccountAPI/GetUserLog',
      httpOptions1
    );
  }
}
