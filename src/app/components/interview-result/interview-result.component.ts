import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';
export interface Test {
  id: number;
  note: string;
  score: number;
  title: string;
}
export interface Interview {
  id: number;
  note: string;
  score: number;
  title: string;
}
@Component({
  selector: 'app-interview-result',
  templateUrl: './interview-result.component.html',
  styleUrls: ['./interview-result.component.scss'],
})
export class InterviewResultComponent implements OnInit {
  @Input('result') result!: number;
  interviewF!: FormGroup;
  listCandidate!: any;
  testList!: Test[];
  interviewList!: Interview[];
  constructor(
    private fb: FormBuilder,
    private candidateS: CandidateService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {}
  favoriteSeason = -1;
  candidateID!: number;
  requestID!: number;

  isLoaded = true;
  ngOnInit(): void {
    (
      document?.querySelector('.overlay') as HTMLElement
    ).style.display = 'block';
    this.isLoaded = false;
    this.candidateID = this.activatedRoute.snapshot.queryParams['id'];
    this.requestID = this.activatedRoute.snapshot.queryParams['requestID'];
    this.interviewF = this.fb.group({
      tests: new FormArray([]),
      interviews: new FormArray([]),
    });
    this.candidateS
      .getAllCandidateStep3(this.requestID)
      .subscribe((response: any) => {
        this.listCandidate = response.list;
        this.isLoaded = true;
      });
    this.candidateS
      .getAllEventCandidate(this.candidateID, this.requestID)
      .subscribe((response: any) => {
        (
          document?.querySelector('.overlay') as HTMLElement
        ).style.display = 'none';
        this.isLoaded=true
        this.interviewList = response.data.interview;
        this.testList = response.data.test;
        for (let interview of this.interviewList) {
          let control = this.fb.group({
            id: interview.id,
            title: interview.title,
            score: [interview.score, [Validators.min(0)]],
            note: [interview.note, [Validators.maxLength(80)]],
          });
          (this.interviewF.get('interviews') as FormArray).push(control);
        }
        for (let test of this.testList) {
          let control = this.fb.group({
            id: test.id,
            title: test.title,
            score: [test.score, [Validators.min(0)]],
            note: [test.note, [Validators.maxLength(80)]],
          });
          (this.interviewF.get('tests') as FormArray).push(control);
        }
      });
  }
  saveInterviewTest() {
    let list = [];
    (
      document?.querySelector('.overlay') as HTMLElement
    ).style.display = 'block';
    this.isLoaded=false
    list = this.interviewF
      .get('tests')
      ?.value.concat(this.interviewF.get('interviews')?.value);

    this.candidateS.saveResultInterview(list).subscribe((response: any) => {
      this.candidateS.stepBehavior.next(true);
      (document?.querySelector('.overlay') as HTMLElement
      ).style.display = 'none';
      this.isLoaded=true
      this.ngOnInit();
    });
  }
  get interviews() {
    return this.interviewF.get('interviews') as FormArray;
  }
  get tests() {
    return this.interviewF.get('tests') as FormArray;
  }
  navigate(candidateID:number){
    // console.log('a')
    // console.log(candidateID)
    // this.router.navigateByUrl(`/ungvien/xemungvien/applications/request?id=${candidateID}&requestID=${this.requestID}`)
    // this.candidateS.stepBehavior.next(true)
    // this.ngOnInit()
    
  }
}
