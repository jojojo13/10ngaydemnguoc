import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request-service/request.service';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-matching-btn',
  templateUrl: './matching-btn.component.html',
  styleUrls: ['./matching-btn.component.scss'],
})
export class MatchingBtnComponent implements OnInit,OnDestroy {
  isLoaded = true;
  @ViewChild('requestPicker') requestPicker!: SwalComponent;
  constructor(
    public readonly swalTargets: SwalPortalTargets,

    private requestService: RequestService,
    private candidateService: CandidateService,
    private commonService: CommonService,
  ) {}
  ngOnDestroy(): void {
    
  }
  ngOnInit(): void {}
  popupRequest() {
    this.requestPicker.fire().then((result) => {
      this.requestService.listSelectedRequest=[]
      if (result.isConfirmed) {
        this.matchingRequest();
      }
    });
  }
  matchingRequest() {
    let rs = this.candidateService.listSelectedCandidate.every((c: any) => {
      return c.statusId == 1 && c.statusht<5;
    });
 
    if (rs) {
      if (!this.requestService.selectedRequestForCandidate) {
        this.commonService.popUpFailed('Please choose request!!!');
        return;
      }
      if (this.candidateService.listSelectedCandidate.length == 0) {
        this.commonService.popUpFailed(
          'Please choose at least one candidate!!!'
        );
        return;
      }
      if(this.requestService.selectedRequestForCandidate.statusID!=4){
        this.commonService.popUpFailed(
          'Only choose approved request'
        );
        return;
      }
      let newIDs = this.candidateService.listSelectedCandidate.map(
        (c: any) => c.id
      );

      let obj = {
        requestID: this.requestService.selectedRequestForCandidate.id,
        lstCandidateID: newIDs,
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
            this.requestService.selectedRequestForCandidate = [];
            this.candidateService.listSelectedCandidate = [];
          
            this.candidateService.matchingBehavior.next(true)

          } else {
            this.isLoaded = true;
            (document?.querySelector('.overlay') as HTMLElement).style.display =
              'none';
            this.commonService.popUpFailed('Request invalid! Only matching child request');
          }
        },
        (err) => {
          this.isLoaded = true;
          (document?.querySelector('.overlay') as HTMLElement).style.display =
            'none';
          this.commonService.popUpFailed('Request invalid! Only matching child request');
        }
      );
    } else {
      this.commonService.popUpFailed('Only choose active and unrecruited candidate');
    }
  }
  deleteRQ(){
    console.log(this.requestService.listSelectedRequest)
  }
}
