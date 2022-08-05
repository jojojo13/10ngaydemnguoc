import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request-service/request.service';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-matching-btn',
  templateUrl: './matching-btn.component.html',
  styleUrls: ['./matching-btn.component.scss'],
})
export class MatchingBtnComponent implements OnInit {
  isLoaded = true;
  @ViewChild('requestPicker') requestPicker!: SwalComponent;
  constructor(
    public readonly swalTargets: SwalPortalTargets,

    private requestService: RequestService,
    private candidateService: CandidateService,
    private commonService: CommonService
  ) {}
  ngOnInit(): void {}
  popupRequest() {
    this.requestPicker.fire().then((result) => {
      if (result.isConfirmed) {
        this.matchingRequest();
      }
    });
  }
  matchingRequest() {
    if (!this.requestService.selectedRequestForCandidate) {
      this.commonService.popUpFailed('Please choose request!!!');
      return;
    }
    if (this.candidateService.listSelectedCandidate.length == 0) {
      this.commonService.popUpFailed('Please choose at least one candidate!!!');
      return;
    }
    let obj = {
      requestID: this.requestService.selectedRequestForCandidate,
      lstCandidateID: this.candidateService.listSelectedCandidate,
    };

    this.candidateService.matchingCandidate(obj).subscribe(
      (response: any) => {
        this.isLoaded = false;
        (document?.querySelector('.overlay') as HTMLElement).style.display =
          'block';
        if (response.status == true) {
          this.isLoaded = true;
          (document?.querySelector('.overlay') as HTMLElement).style.display =
            'none';
          this.commonService.popUpSuccess();
        } else {
          this.isLoaded = true;
          (document?.querySelector('.overlay') as HTMLElement).style.display =
            'none';
          this.commonService.popUpFailed('Matching failed');
        }
      },
      (err) => {
        this.isLoaded = true;
        (document?.querySelector('.overlay') as HTMLElement).style.display =
          'none';
        this.commonService.popUpFailed('Matching failed');
      }
    );
  }
}
