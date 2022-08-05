import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  baseUrl = 'https://localhost:44376/api/RequestAPI';
  selectedRequest = {
    code: '',
    comment: 'string',
    createdOn: '',
    deadline: '',
    department: '',
    experience: 0,
    history: '',
    hrInchange: '',
    hrInchangeId: null,
    id: 0,
    level: 0,
    levelName: '',
    name: '',
    note: '',
    office: '',
    orgnizationID: 0,
    orgnizationName: '',
    parentId: 0,
    position: '',
    positionID: 2,
    projectID: 0,
    projectname: '',
    quantity: 0,
    rank: 0,
    requestLevel: '',
    signID: 0,
    status: 0,
    statusID: 0,
    typeID: 0,
    typename: '',
  };
  listSelectedRequest!: Array<number>;
  selectedRequestForCandidate:any
  constructor(private __http: HttpClient) {
    this.listSelectedRequest = [];
  }

  getRequestByPaging(index: number, size: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseUrl + `/GetAllRequest?index=${index}&size=${size}`,
      {},
      httpOptions1
    );
  }
  getChildrenByParentID(parentID: number) {
    let params = new HttpParams().set('parentId', parentID);
    return this.__http.post(
      this.baseUrl + `/GetChildRequestById?parentId=${parentID}`,
      { params: params }
    );
  }
  getAutoGenerateCODE(
    table: string,
    rank: number = 1,
    collumName: string,
    parentID: number = 0
  ) {
    return this.__http.post(
      'https://localhost:44376/api/CommonAPI/autoGenCode',
      { table, rank, collumName, parentID },
      { responseType: 'text' }
    );
  }

  insertRequest(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      'https://localhost:44376/api/RequestAPI/InsertRequest',
      request, httpOptions1
    );
  }
  resetDataSelectedRq() {
    this.selectedRequest = {
      code: '',
      comment: '',
      createdOn: '',
      deadline: '',
      department: '',
      experience: 0,
      history: '',
      hrInchange: '',
      hrInchangeId: null,
      id: 0,
      level: 0,
      levelName: '',
      name: '',
      note: '',
      office: '',
      orgnizationID: 0,
      orgnizationName: '',
      parentId: 0,
      position: '',
      positionID: 2,
      projectID: 0,
      projectname: '',
      quantity: 0,
      rank: 0,
      requestLevel: '',
      signID: 0,
      status: 0,
      statusID: 0,
      typeID: 0,
      typename: '',
    };
  }
  approveRequest(list: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.put(this.baseUrl + '/ApproveRequest', list, httpOptions1);
  }
  cancelRequest(list: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.put(this.baseUrl + '/CancelRequest', list, httpOptions1);
  }
  submitRequest(list: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.put(this.baseUrl + '/SubmitRequest', list, httpOptions1);
  }
  rejectRequest(list: Array<number>) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.put(this.baseUrl + '/RejectRequest', list, httpOptions1);
  }
  editRequest(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.put('https://localhost:44376/api/RequestAPI/ModifyRequest', request, httpOptions1);
  }


  sendComment(request: any) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.put('https://localhost:44376/api/RequestAPI/SendComment', request, httpOptions1);
  }

  setHRID(id: number, hrID: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.put('https://localhost:44376/api/RequestAPI/setHrInchage', { id, hrID }, httpOptions1)
  }

  getRequestByID(id: number) {
    return this.__http.put(`https://localhost:44376/api/RequestAPI/GetRequestByID?Id=${id}`, {});
  }
  modifyRQbyID(id: number, comment: string) {
    return this.__http.put(`https://localhost:44376/api/RequestAPI/SendComment`, { id, comment });
  }

  checkTotal(id: number, quantity: number) {
    return this.__http.post(`https://localhost:44376/api/RequestAPI/CheckTotalQuantity?id=${id}&quantity=${quantity}`, {});
  }
  filterRequest(obj:any){
    return this.__http.post('https://localhost:44376/api/RequestAPI/GetAllRequestByFilter',obj)
  }

}
