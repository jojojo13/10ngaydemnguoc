import { ActivatedRoute, Router } from '@angular/router';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import * as FileSaver from 'file-saver';

import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUpload } from '../models/FileUpload';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  fileBehavior!: BehaviorSubject<boolean>;
  fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';
  httpClient!: HttpClient;
  public exportExcel(jsonData: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);

    const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }

  baseUrl = 'http://139.99.90.39:3100/api/CommonAPI/GetOtherList';
  dataChange: BehaviorSubject<boolean>;
  pdfSrc = '';
  emitBahavior: BehaviorSubject<boolean>;
  imgBehavior: BehaviorSubject<boolean>;
  fileUrl = '';
  imgURL=''
  constructor(
    private __http: HttpClient,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private httpBackend:HttpBackend
  ) {
    this.imgBehavior= new BehaviorSubject<boolean>(false);
    this.fileBehavior = new BehaviorSubject<boolean>(false);
    this.dataChange = new BehaviorSubject<any>(null);
    this.emitBahavior = new BehaviorSubject<any>(null);
    this.httpClient = new HttpClient(httpBackend);
  }

  getOtherList(code: string, index: number, size: number) {
    return this.__http.post(
      `http://139.99.90.39:3100/api/CommonAPI/GetOtherList?code=${code}&index=${index}&size=${size}`,
      { code, index, size }
    );
  }

  getOtherListByAttribute(id: number) {
    return this.__http.post(
      `http://139.99.90.39:3100/api/CommonAPI/GetOtherListByAttribute?id=${id}`,
      { id }
    );
  }

  getAllOtherList(code: string, index: number, size: number) {
    return this.__http.post(
      `http://139.99.90.39:3100/api/CommonAPI/GetAllOtherList?code=${code}&index=${index}&size=${size}`,
      { code, index, size }
    );
  }

  insertOtherList(obj: any) {
    return this.__http.post(
      'http://139.99.90.39:3100/api/CommonAPI/InsertOtherList',
      obj
    );
  }
  autoGencode3Char(table: string, code: string) {
    return this.__http.post(
      'http://139.99.90.39:3100/api/CommonAPI/autoGenCode3character',
      { table, code },
      { responseType: 'text' }
    );
  }
  editOtherList(obj: any) {
    return this.__http.put(
      'http://139.99.90.39:3100/api/CommonAPI/ModifyOtherList',
      obj
    );
  }
  deleteOtherList(arr: Array<number>) {
    return this.__http.post(
      'http://139.99.90.39:3100/api/CommonAPI/DeleteOtherList',
      arr
    );
  }

  activeOtherList(arr: Array<number>) {
    return this.__http.post(
      'http://139.99.90.39:3100/api/CommonAPI/ActiveOtherList',
      arr
    );
  }

  deactiveOtherList(arr: Array<number>) {
    return this.__http.post(
      'http://139.99.90.39:3100/api/CommonAPI/DeactiveOtherList',
      arr
    );
  }
  checkQuantityCandidate(obj: any) {
    return this.__http.post(
      'http://139.99.90.39:3100/api/CandidateAPI/CheckQuantity',
      obj
    );
  }
  popUpSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Successfully',
      showConfirmButton: true,
      timer: 1500,
    });
  }
  popUpFailed(msg: string) {
    Swal.fire({
      icon: 'error',
      title: msg,
      showConfirmButton: true,
    });
  }
  popUpMessage(msg: string) {
    Swal.fire(msg);
  }
  popUpConfirmed(msg: string) {}
  atDate(date: string) {
    return date.split('/').join('-');
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  private basePath = '/uploads';

  getFile() {}
  pushFileToStorage(
    fileUpload: FileUpload,
    candidatePath: string = ''
  ): Observable<number> {
    let filePath = '';
    if (candidatePath == '') {
      filePath = `${this.basePath}/${fileUpload.file.name}`;
    } else {
      filePath = `${this.basePath}/${candidatePath}/${fileUpload.file.name}`;
    }

    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            this.fileUrl = downloadURL;
            this.fileBehavior.next(true);
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload);
          });
        })
      )
      .subscribe();
    return uploadTask.percentageChanges() as Observable<number>;
  }
  pushFileToStorage2(
    fileUpload: FileUpload,
    candidatePath: string = ''
  ): Observable<number> {
    let filePath = '';
    if (candidatePath == '') {
      filePath = `${this.basePath}/${fileUpload.file.name}`;
    } else {
      filePath = `${this.basePath}/${candidatePath}/${fileUpload.file.name}`;
    }

    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            this.imgURL = downloadURL;
            this.imgBehavior.next(true);
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload);
          });
        })
      )
      .subscribe();
    return uploadTask.percentageChanges() as Observable<number>;
  }
  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }
  getFileUploads(numberItems: number): any {
    return this.db.list(this.basePath, (ref) => ref.limitToLast(numberItems));
  }
  deleteFile(downloadUrl: string) {
    // console.log(this.storage.storage.ref(downloadUrl))
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }

  resetPWD(obj:any){
    return this.httpClient.post('http://139.99.90.39:3100/api/AccountAPI/ResetpassWord',obj)
  }
  changePass(obj:any){
    return this.__http.post('http://139.99.90.39:3100/api/AccountAPI/ChangePass',obj)
  }

  getReportByYear(year:number){
    return this.__http.post(`http://139.99.90.39:3100/api/CandidateAPI/ReportByYear?year=${year}`,{})
  }
  getSucessStep1(){
    return this.__http.get('http://139.99.90.39:3100/api/CandidateAPI/ReportStep1')
  }
  getInStep3(){
    return this.__http.get('http://139.99.90.39:3100/api/CandidateAPI/ReportStep3')
  }
  getInStep5(){
    return this.__http.get('http://139.99.90.39:3100/api/CandidateAPI/ReportPassStep5')
  }
  getRpNotPass(){
    return this.__http.get('http://139.99.90.39:3100/api/CandidateAPI/ReportNotPass')
  }
}
