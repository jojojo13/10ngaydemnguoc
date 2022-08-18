import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss'],
})
export class OfferFormComponent implements OnInit, OnChanges {
  @Input('infor') infor: any;
  offerForm!: FormGroup;
  positionID!: number;
  constructor(
    private fb: FormBuilder,
    private candidateS: CandidateService,
    private activatedRoute: ActivatedRoute,
    private orgS: OrganizationService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.infor);
  }
  candidateID!: number;
  requestID!: number;
  isLoaded = true;
  insurance = 1;
  listPosition: any;
  Data = [
    { name: 'Bonus project', value: 'Bonus project' },
    { name: 'Bonus salary', value: 'Bonus salary' },
    { name: 'Bonus holiday', value: 'Bonus holiday' },
  ];
  ngOnInit(): void {
    this.candidateID = this.activatedRoute.snapshot.queryParams['id'];
    this.requestID = this.activatedRoute.snapshot.queryParams['requestID'];
    this.offerForm = this.fb.group({
      netSalary: ['', [Validators.required, Validators.pattern('^[1-9]\\d*$')]],
      internSalary: [{ value: '', disabled: true }],
      allowance: [''],
      bonus: this.fb.array([]),
      insurance: [this.insurance],
      workTime: ['Fulltime: 8:00 - 17:00 Mon-Fri'],
      location: [{ value: '', disabled: true }],
      position: [],
      note: ['', Validators.maxLength(150)],
    });
    this.offerForm.get('netSalary')?.valueChanges.subscribe((change: any) => {
      let internSal = this.offerForm.get('netSalary')?.value * 0.85;
      this.offerForm.get('internSalary')?.setValue(internSal);
    });
    this.getLocationAndPosition();
  }
  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.offerForm.get('bonus') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  reviewStep4(result: number) {
    this.isLoaded = false;
    (document?.querySelector('.overlay') as HTMLElement).style.display =
      'block';
    let obj = {
      candidateId: this.candidateID,
      requestId: this.requestID,
      luongNet: this.offerForm.get('netSalary')?.value,
      luongThuViec: this.offerForm.get('internSalary')?.value.toString(),
      phuCap: this.offerForm.get('allowance')?.value,
      thuong: this.offerForm.get('bonus')?.value.join(),
      baoHiem: this.insurance.toString(),
      thoigianlv: this.offerForm.get('workTime')?.value,
      diaDiem: this.offerForm.get('location')?.value,
      vitriCv: this.offerForm.get('position')?.value.toString(),
      noteStep4: this.offerForm.get('note')?.value,
      step4Result: result,
    };

    this.candidateS.setStep4(obj).subscribe(
      (response: any) => {
        this.isLoaded = true;
        (document?.querySelector('.overlay') as HTMLElement).style.display =
          'none';
        this.candidateS.stepBehavior.next(true);
      },
      (err) => {
        this.isLoaded = true;
        (document?.querySelector('.overlay') as HTMLElement).style.display =
          'none';
      }
    );
  }
  getLocationAndPosition() {
    this.orgS.getPositionByOrgID(this.infor.orgId).subscribe(
      (response: any) => {
        this.listPosition = response.data;
      },
      (err) => {
      }
    );
    this.candidateS.getDDPosition(this.requestID).subscribe((response: any) => {
      this.positionID = response.data.position;
      this.offerForm.get('position')?.setValue(response.data.position);
      this.offerForm.get('location')?.setValue(response.data.diadiem);
    });
  }
}
