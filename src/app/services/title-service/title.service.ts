import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private http: HttpClient) { }

  getAll(index: number, size: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.post(`http://139.99.90.39:3100/api/OrgnizationAPI/GetAllTitle?index=${index}&size=${size}`, {}, httpOptions1)
  }

  getAllTitle(index: number, size: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.post(`http://139.99.90.39:3100/api/OrgnizationAPI/GetAllOfTitle?index=${index}&size=${size}`, {}, httpOptions1)
  }

  insertTitle(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.post(
      'http://139.99.90.39:3100/api/OrgnizationAPI/InsertTitle',
      request, httpOptions1
    );
  }
  modifyTitle(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.post(
      'http://139.99.90.39:3100/api/OrgnizationAPI/ModifyTitle',
      request, httpOptions1
    );
  }

  deleteTitle(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.post(
      'http://139.99.90.39:3100/api/OrgnizationAPI/DeleteTitle',
      arr, httpOptions1
    );
  }

  activeTitle(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.post(
      'http://139.99.90.39:3100/api/OrgnizationAPI/ActiveTitle',
      arr, httpOptions1
    );
  }

  deactiveTitle(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.post(
      'http://139.99.90.39:3100/api/OrgnizationAPI/DeActiveTitle',
      arr, httpOptions1
    );
  }
}
