import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.scss'],
})
export class OnboardComponent implements OnInit {
  constructor(
    private candidateS: CandidateService,
    private activatedRoute: ActivatedRoute
  ) {}
  candidateID!: number;
  requestID!: number;
  isLoaded=true
  ngOnInit(): void {
    this.candidateID = this.activatedRoute.snapshot.queryParams['id'];
    this.requestID = this.activatedRoute.snapshot.queryParams['requestID'];
  }
  reviewStep5(result: number) {
    this.isLoaded=false;
    (document?.querySelector('.overlay') as HTMLElement).style.display =
    'block';
    let obj = {
      candidateId: this.candidateID,
      requestId: this.requestID,
      step5Result: result,
    };
    this.candidateS.setStep5(obj).subscribe((response: any) => {
      this.isLoaded=true;
      (document?.querySelector('.overlay') as HTMLElement).style.display =
      'none';
      this.candidateS.stepBehavior.next(true)
    },err=>{
      this.isLoaded=true;
    (document?.querySelector('.overlay') as HTMLElement).style.display =
    'none';
    });
  }
}
