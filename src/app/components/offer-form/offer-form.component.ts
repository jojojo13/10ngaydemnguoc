import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss'],
})
export class OfferFormComponent implements OnInit,OnChanges {
  @Input('infor') infor:any
  offerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private candidateS: CandidateService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
 
  }
  candidateID!: number;
  requestID!: number;
  isLoaded=true
  ngOnInit(): void {
    this.candidateID = this.activatedRoute.snapshot.queryParams['id'];
    this.requestID = this.activatedRoute.snapshot.queryParams['requestID'];
    this.offerForm = this.fb.group({
      offerDeal: ['', [Validators.required, Validators.pattern('^[1-9]\\d*$')]],
      note: ['', Validators.maxLength(100)],
    });
  }
  reviewStep4(result: number) {
    this.isLoaded=false;
    (document?.querySelector('.overlay') as HTMLElement).style.display =
    'block';
    let obj = {
      candidateId: this.candidateID,
      requestId: this.requestID,
      noteFinalOffer: this.offerForm.get('note')?.value,
      finalOffer: parseInt(this.offerForm.get('offerDeal')?.value),
      step4Result: result,
    };
    console.log(obj);
    this.candidateS.setStep4(obj).subscribe(
      (response: any) => {
        this.isLoaded=true;
    (document?.querySelector('.overlay') as HTMLElement).style.display =
    'none';
        this.candidateS.stepBehavior.next(true);
      },
      (err) => {
        this.isLoaded=true;
    (document?.querySelector('.overlay') as HTMLElement).style.display =
    'none';
      }
    );
  }
}
