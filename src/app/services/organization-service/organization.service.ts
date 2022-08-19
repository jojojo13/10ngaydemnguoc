import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  baseUrl = 'https://test-api-fpt.herokuapp.com/api/OrgnizationAPI';
  baseCommonUrl = 'https://test-api-fpt.herokuapp.com/api/CommonAPI';
  baseProfileUrl = 'https://test-api-fpt.herokuapp.com/api/ProfileAPI';
  constructor(private __http: HttpClient) {}

  ngOnInit(): void {}
  getAllOrganization() {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(this.baseUrl + '/GetAllOrg', {}, httpOptions1);
  }
  getPositionByOrgID(id: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseProfileUrl + `/GetListPositionByOrgID?ID=${id}`,
      [],
      httpOptions1
    );
  }

  getOrgByID(id: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseUrl + `/getOrgByID?Id=${id}`,
      {},
      httpOptions1
    );
  }
  getOtherListType(id: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseCommonUrl + `/GetOtherListType?phanHe=${id}`,
      {},
      httpOptions1
    );
  }

  getAllTitle(index: number, size: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseUrl + `/GetAllTitle?index=${index}&size=${size}`,
      {},
      httpOptions1
    );
  }

  getAllPosition(index: number, size: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseUrl + `/GetAllPosition?index=${index}&size=${size}`,
      {},
      httpOptions1
    );
  }

  getAllofPosition(index: number, size: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseUrl + `/GetAllOfPosition?index=${index}&size=${size}`,
      {},
      httpOptions1
    );
  }

  insertPosition(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseUrl + '/InsertPosition',
      request,
      httpOptions1
    );
  }
  modifyPosition(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseUrl + '/ModifyPosition',
      request,
      httpOptions1
    );
  }

  deletePosition(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseUrl + '/DeletePosition',
      arr,
      httpOptions1
    );
  }

  activePosition(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseUrl + '/ActivePosition',
      arr,
      httpOptions1
    );
  }
  deactivePosition(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseUrl + '/DeActivePosition',
      arr,
      httpOptions1
    );
  }

  checkPositionExist(orgId: number, positionId: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseUrl +
        `/CheckPositionExist?orgId=${orgId}&positionId=${positionId}`,
      {},
      httpOptions1
    );
  }

  getAllPositionOrg(index: number, size: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseUrl + `/GetAllPositionOrg?index=${index}&size=${size}`,
      {},
      httpOptions1
    );
  }

  insertPositionOrg(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseUrl + '/InsertPositionOrg',
      request,
      httpOptions1
    );
  }
  modifyPositionOrg(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseUrl + '/ModifyPositionOrg',
      request,
      httpOptions1
    );
  }
  deletePositionOrg(arr: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseUrl + '/DeletePositionOrg',
      arr,
      httpOptions1
    );
  }
  insertOrg(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(this.baseUrl + `/InsertOrg`, request, httpOptions1);
  }

  modifyOrg(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(this.baseUrl + `/ModifyOrg`, request, httpOptions1);
  }

  getEmployeeByOrgID(id: number, index: number, size: number) {
    return this.__http.post(
      `https://test-api-fpt.herokuapp.com/api/ProfileAPI/GetListEmployeeByOrgID?id=${id}&index=${index}&size=${size}`,
      {}
    );
  }

  getEmployeeByOrgIDByFilter(obj: any) {
    return this.__http.post(
      `https://test-api-fpt.herokuapp.com/api/ProfileAPI/GetListEmployeeByOrgIDByFilter`,
      obj
    );
  }

  getAllNation(index: number, size: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseUrl + `/GetNationList?index=${index}&size=${size}`,
      {},
      httpOptions1
    );
  }

  getAllProvince(index: number, size: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseUrl + `/GetProvinceList?index=${index}&size=${size}`,
      {},
      httpOptions1
    );
  }
  getAllDistrict(index: number, size: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseUrl + `/GetDistrictList?index=${index}&size=${size}`,
      {},
      httpOptions1
    );
  }
  getAllWard(index: number, size: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseUrl + `/GetWardList?index=${index}&size=${size}`,
      {},
      httpOptions1
    );
  }

}
