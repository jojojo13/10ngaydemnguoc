import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Account } from '../models/Account';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeService {
  public userSubject: BehaviorSubject<any>;
  public user:Observable<any>
  constructor(private _http: HttpClient) {
    this.userSubject = new BehaviorSubject<any>(null);
    this.user = this.userSubject.asObservable();
  }

  signIn(account: Account) {
    return this._http
      .post('https://localhost:44376/api/AccountAPI/GetAccount', account)
      .pipe(
        map((user) => {
          this.userSubject.next(user);
          return user;
        })
      );
  }
  getUserInfo(){
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this._http.get('https://localhost:44376/api/AccountAPI/GetUserLog',httpOptions1)
  }
}
