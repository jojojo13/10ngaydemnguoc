import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CandidateService } from 'src/app/services/candidate-service/candidate.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-request-in-applications',
  templateUrl: './request-in-applications.component.html',
  styleUrls: ['./request-in-applications.component.scss'],
})
export class RequestInApplicationsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private candidateService: CandidateService,
    private commonService: CommonService
  ) {}

  index = -1;
  stepNow = -1;
  candidateID!: number;
  requestID!: number;
  candidateInfor: any;
  isLoaded = true;
  srcPDF = '';
  ngOnInit(): void {
    this.isLoaded = false;

    this.candidateID = this.activatedRoute.snapshot.queryParams['id'];
    this.requestID = this.activatedRoute.snapshot.queryParams['requestID'];
    this.candidateService
      .getCandidateRequestInfor(this.requestID, this.candidateID)
      .subscribe(
        (response: any) => {
          this.candidateInfor = response.data;
          this.stepNow = this.candidateInfor.stepNow;
          this.index = this.stepNow;
          console.log(response.data);
          this.isLoaded = true;
        },
        (err) => {
          this.isLoaded = true;
        }
      );
  }

  chooseStep(step: number, ele: HTMLElement) {
    if (this.stepNow >= step) {
      this.index = step;
    }
  }

  reviewStep1(step1: number) {
    this.isLoaded = false;
    let objStep1 = {
      candidateId: this.candidateID,
      requestId: this.requestID,
      step1: step1,
      noteStep1: '',
    };
    this.candidateService.setStep1Candidate(objStep1).subscribe(
      (response: any) => {
        this.ngOnInit();
        this.isLoaded = true;
      },
      (er) => {
        this.isLoaded = true;
        this.ngOnInit();
      }
    );
  }
  getPDFsrc($event: string) {
    this.srcPDF = $event;
  }
}
