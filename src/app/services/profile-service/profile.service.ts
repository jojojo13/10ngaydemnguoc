import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseProfileUrl = 'https://localhost:44376/api/ProfileAPI'
  constructor(private __http: HttpClient) { }

  getNationList() {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(this.baseProfileUrl + '/GetNation', {}, httpOptions1);
  }
  insertNation(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + `/InsertNation`,
      request, httpOptions1
    );
  }
  modifyNation(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + `/ModifyNation`,
      request, httpOptions1
    );
  }
  deleteNation(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + '/DeleteNation',
      arr, httpOptions1
    );
  }
  activeNation(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + '/ActiveNation',
      arr, httpOptions1
    );
  }

  deactiveNation(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + '/DeActiveNation',
      arr, httpOptions1
    );
  }

  getProvinceByNationId(id: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(this.baseProfileUrl + `/GetProvinceByNationId?nationID=${id}`, {}, httpOptions1)
  }

  insertProvince(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + `/InsertProvince`,
      request, httpOptions1
    );
  }
  modifyProvince(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + `/ModifyProvince`,
      request, httpOptions1
    );
  }
  deleteProvince(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + '/DeleteProvince',
      arr, httpOptions1
    );
  }
  activeProvince(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + '/ActiveProvince',
      arr, httpOptions1
    );
  }

  deactiveProvince(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + '/DeActiveProvince',
      arr, httpOptions1
    );
  }


  getDistrictByProvinceId(id: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(this.baseProfileUrl + `/GetDistrictByProvinceId?provinceId=${id}`, {}, httpOptions1)
  }
  insertDistrict(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + `/InsertDistrict`,
      request, httpOptions1
    );
  }
  modifyDistrict(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + `/ModifyDistrict`,
      request, httpOptions1
    );
  }
  deleteDistrict(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + '/DeleteDistrict',
      arr, httpOptions1
    );
  }
  activeDistrict(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + '/ActiveDistrict',
      arr, httpOptions1
    );
  }

  deactiveDistrict(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + '/DeActiveDistrict',
      arr, httpOptions1
    );
  }

  getWardByDistrictId(id: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(this.baseProfileUrl + `/GetWardByDistrictId?DistrictID=${id}`, {}, httpOptions1)
  }

  insertWard(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + `/InsertWard`,
      request, httpOptions1
    );
  }
  modifyWard(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + `/ModifyWard`,
      request, httpOptions1
    );
  }
  deleteWard(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + '/DeleteWard',
      arr, httpOptions1
    );
  }
  activeWard(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + '/ActiveWard',
      arr, httpOptions1
    );
  }

  deactiveWard(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + '/DeActiveWard',
      arr, httpOptions1
    );
  }



  getContractType(index: number, size: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + `/GetContractType?index=${index}&size=${size}`,
      { index, size }, httpOptions1
    );
  }

  getAllContractType(index: number, size: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + `/GetAllContractType?index=${index}&size=${size}`,
      { index, size }, httpOptions1
    );
  }

  insertContractType(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + `/InsertContractType`,
      request, httpOptions1
    );
  }
  modifyContractType(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + `/ModifyContractType`,
      request, httpOptions1
    );
  }
  deleteContractType(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + '/DeleteContractType',
      arr, httpOptions1
    );
  }


  activeContractType(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + '/ActiveContractType',
      arr, httpOptions1
    );
  }

  deactiveContractType(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + '/DeActiveContractType',
      arr, httpOptions1
    );
  }

  getProfileOfEmployee(id: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(this.baseProfileUrl + `/getProfileOfEmployee?empID=${id}`, {}, httpOptions1)
  }



  GetContractEmployeeByFilter(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + `/GetContractEmployeeByFilter`,
      request, httpOptions1
    );
  }

  deactiveContractEmp(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + '/DeActiveContractEmployee',
      arr, httpOptions1
    );
  }
  activeContractEmp(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + '/ActiveContractEmployee',
      arr, httpOptions1
    );
  }
  deleteContractEmp(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + '/DeActiveContractType',
      arr, httpOptions1
    );
  }

  insertContractEmp(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + `/InsertContractEmployee`,
      request, httpOptions1
    );
  }
  modifyContractEmp(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + `/ModifyContractEmployee`,
      request, httpOptions1
    );
  }

  getContractEmployeeById(id: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(this.baseProfileUrl + `/getContractEmployeeById?id=${id}`, {}, httpOptions1)
  }

}
