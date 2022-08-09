import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';
import { CommonService } from 'src/app/services/common.service';
import { RequestService } from 'src/app/services/request-service/request.service';

@Component({
  selector: 'app-confirm-matching',
  templateUrl: './confirm-matching.component.html',
  styleUrls: ['./confirm-matching.component.scss'],
})
export class ConfirmMatchingComponent implements OnInit {
  constructor(
    private requestService: RequestService,
    private candidateService: CandidateService,
    private commonService: CommonService
  ) {}
  isLoaded = true;
  ngOnInit(): void {}
  matchingRequest() {
    let rs=this.requestService.selectedRequestForCandidate.every((c:any)=>[
      c.statusId==1
    ])
    if(rs){
      this.isLoaded = false;
      (document?.querySelector('.overlay') as HTMLElement).style.display =
        'block';
      
  
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
    }else{
      this.commonService.popUpFailed('Choose only active candidate!!!');
    }
  
  }
}
