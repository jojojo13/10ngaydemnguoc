import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CandidateFilter } from 'src/app/models/CandidateFilter';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  public skillBehaviour: BehaviorSubject<boolean>;
  public skill: any;
  public skillList: any;
  public skillSheet: any;
  public expList: any;
  public detectChange: BehaviorSubject<boolean>;
  public otherList: any;
  public stepBehavior: BehaviorSubject<boolean>;
  listSelectedCandidate: any;
  constructor(private __http: HttpClient) {
    this.skillBehaviour = new BehaviorSubject<boolean>(false);
    this.detectChange = new BehaviorSubject<boolean>(false);
    this.stepBehavior = new BehaviorSubject<boolean>(false);
    this.listSelectedCandidate = [];
  }
  getAllcandidateByFilter(obj: CandidateFilter) {
    return this.__http.post(
      `https://localhost:44376/api/CandidateAPI/GetAllCandidateByFillter`,
      obj
    );
  }
  getSkillSheet(code: string) {
    return this.__http.post(
      `https://localhost:44376/api/CandidateAPI/GetSkillSheet?code1=${code}`,
      {}
    );
  }
  getSkillType() {
    return this.__http.post(
      `https://localhost:44376/api/CandidateAPI/GetTypeSkill?type=2`,
      {}
    );
  }

  insertCandidate(obj: any) {
    return this.__http.post(
      'https://localhost:44376/api/CandidateAPI/InsertRcCandidate',
      obj
    );
  }
  CheckDuplicateCandidate(obj: any) {
    return this.__http.post(
      'https://localhost:44376/api/CandidateAPI/CheckDuplicateCandidate',
      obj
    );
  }
  getCandidateById(id: number) {
    return this.__http.post(
      `https://localhost:44376/api/CandidateAPI/GetOneInforCandidate?id=${id}`,
      {}
    );
  }
  matchingCandidate(obj: any) {
    return this.__http.post(
      'https://localhost:44376/api/CandidateAPI/MatchingCandidate',
      obj
    );
  }

  getCandidateByRequest(obj: any) {
    return this.__http.post(
      `https://localhost:44376/api/CandidateAPI/GetCandidateByRequest`,
      obj
      // { responseType: 'text' }
    );
  }

  deleteCandidate(arr: Array<number>) {
    return this.__http.post(
      `https://localhost:44376/api/CandidateAPI/DeleteCandidate`,
      arr
    );
  }

  activeCandidate(arr: Array<number>) {
    return this.__http.post(
      `https://localhost:44376/api/CandidateAPI/ActiveCandidate`,
      arr
    );
  }

  deActiveCandidate(comment: string, listCandidateID: Array<number>) {
    let obj = {
      comment: comment,
      lstCandidateID: listCandidateID,
    };
    return this.__http.post(
      `https://localhost:44376/api/CandidateAPI/DeActiveCandidate`,
      obj
    );
  }
  getRequestInCandidate(candidateID: number) {
    return this.__http.post(
      `https://localhost:44376/api/CandidateAPI/GetAllRequestByCandidateID?id=${candidateID}`,
      {}
    );
  }

  getCandidateRequestInfor(requestID: number, candidateID: number) {
    return this.__http.post(
      `https://localhost:44376/api/CandidateAPI/GetCandidateRequestInf?requestId=${requestID}&candidateId=${candidateID}`,
      {}
    );
  }
  setStep1Candidate(obj: any) {
    return this.__http.post(
      'https://localhost:44376/api/CandidateAPI/SetStep1CandidatePV',
      obj
    );
  }
  insertScheduleCandidate(obj: any) {
    return this.__http.post(
      'https://localhost:44376/api/ScheduleAPI/InsertSchedule',
      obj
    );
  }
  getScheduleCandidate(rqID: number, canID: number) {
    return this.__http.post(
      `https://localhost:44376/api/ScheduleAPI/GetSchedule?requestId=${rqID}&candidateId=${canID}`,
      {}
    );
  }
  modifyCandidateSchedule(obj: any) {
    return this.__http.post(
      'https://localhost:44376/api/ScheduleAPI/ModifySchedule',
      obj
    );
  }
  deleteScheDule(obj: Array<number>) {
    return this.__http.post(
      'https://localhost:44376/api/ScheduleAPI/DeleteSchedule',
      obj
    );
  }
  getInfEdit(id: number) {
    return this.__http.post(
      `https://localhost:44376/api/CandidateAPI/GetOneInforCandidateToEdit?id=${id}`,
      {}
    );
  }
  editInfoCan(obj: any) {
    return this.__http.post(
      'https://localhost:44376/api/CandidateAPI/EditInforCandidate',
      obj
    );
  }
  checkInforCandidateEdit(obj: any) {
    return this.__http.post(
      'https://localhost:44376/api/CandidateAPI/CheckInforCandidateEdit',
      obj
    );
  }
  saveResultInterview(obj:any){
    return this.__http.post('https://localhost:44376/api/CandidateAPI/SetStep3CandidatePV',obj)
  }
  getAllCandidateStep3(id:number){
    return this.__http.post(`https://localhost:44376/api/CandidateAPI/GetAllResultStep3?requestID=${id}`,{})
  }
  pass3tp4(obj:any){
    return this.__http.post('https://localhost:44376/api/CandidateAPI/PassStep3to4',obj)
  }
}
