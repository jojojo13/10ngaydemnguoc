import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';

@Component({
  selector: 'app-interview-result',
  templateUrl: './interview-result.component.html',
  styleUrls: ['./interview-result.component.scss'],
})
export class InterviewResultComponent implements OnInit {
  interviewF!: FormGroup;
  listCandidate!: any;
  constructor(
    private fb: FormBuilder,
    private candidateS: CandidateService,
    private activatedRoute: ActivatedRoute
  ) {}
  favoriteSeason = -1;
  candidateID!: number;
  requestID!: number;
  candidateInfor: any;
  isLoaded = true;
  ngOnInit(): void {
    this.candidateID = this.activatedRoute.snapshot.queryParams['id'];
    this.requestID = this.activatedRoute.snapshot.queryParams['requestID'];
    this.interviewF = this.fb.group({
      noteInterview: ['', Validators.maxLength(150)],
      testScore: ['', [Validators.required, Validators.min(0)]],
      noteTest: ['', Validators.maxLength(150)],
    });
    this.candidateS
      .getAllCandidateStep3(this.requestID)
      .subscribe((response: any) => {
        this.listCandidate = response.list;
      });
    this.candidateS
      .getCandidateRequestInfor(this.requestID, this.candidateID)
      .subscribe(
        (response: any) => {
          this.candidateInfor = response.data;

          console.log(this.candidateInfor);
          this.isLoaded = true;
        },
        (err) => {
          this.isLoaded = true;
        }
      );
  }
  saveInterviewTest() {
    let obj = {
      candidateId: this.candidateID,
      requestId: this.requestID,
      resultStep3Test: this.interviewF.get('testScore')?.value,
      noteRstep3Test: this.interviewF.get('noteTest')?.value.trim(),
      resultStep3InterView: 1,
      noteRstep3InterView: this.interviewF.get('noteInterview')?.value.trim(),
    };

    this.candidateS.saveResultInterview(obj).subscribe((response: any) => {
      this.candidateS.stepBehavior.next(true);
      this.ngOnInit();
    });
  }
}
