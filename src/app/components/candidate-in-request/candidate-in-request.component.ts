import { debounceTime } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { AuthorizeService } from 'src/app/services/authorize.service';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-candidate-in-request',
  templateUrl: './candidate-in-request.component.html',
  styleUrls: ['./candidate-in-request.component.scss'],
})
export class CandidateInRequestComponent implements OnInit {
  @ViewChild('candidatePicker') candidatePicker!: SwalComponent;
  candidateForm!: FormGroup;
  listCandidate: any;
  itemsPerPage = 20;
  totalItems!: number;
  page: number = 1;
  idRequest = 0;
  isLoaded: boolean = false;
  isNull=false;
  candidateFilter = {
    name: '',
    yob: 0,
    phone: '',
    email: '',
    location: '',
    position: '',
    yearExp: '',
    language: '',
    index: 0,
    size: this.itemsPerPage,
    status: 0,
    requestID: 0,
  };
  constructor(
    private commonService: CommonService,
    public auth: AuthorizeService,
    public readonly swalTargets: SwalPortalTargets,
    private candidateService: CandidateService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idRequest = this.activatedRoute.snapshot.params['id'];
    this.candidateFilter.requestID = this.idRequest;
    this.initForm();
  }
  showPopUP() {
    this.candidatePicker.fire();
    this.loadData();
  }
  loadData() {
    this.clearData();

    this.candidateService.getCandidateByRequest(this.candidateFilter).subscribe(
      (response: any) => {
        this.isLoaded = true;
        this.listCandidate = response.data;
        this.totalItems = response.totalItem;
      },
      (err) => {
        this.isLoaded = true;

        // this.commonService.popUpFailed('Failed');
        if(err.status==200){
          this.isNull=true

        }
      }
    );
  }
  gty(page: number) {
    this.isLoaded = false;
    // this.router.navigateByUrl(
    //   `/ungvien/xemungvien?index=${page}&size=${this.itemsPerPage}`
    // );

    this.clearData();
    this.candidateFilter.index = page - 1;
    this.loadData();
  }
  navigateToView(a: any) {
    
  }
  clearData() {
    this.isLoaded = false;
    this.listCandidate = null;
  }
  initForm() {
    this.candidateForm = this.fb.group({
      id: [''],
      name: [''],
      yob: [''],
      phone: [''],
      email: [''],
      location: [''],
      position: [''],
      exp: [''],
      languages: [''],
    });
    this.candidateForm.valueChanges
      .pipe(debounceTime(1500))
      .subscribe((selectedValue) => {
        this.candidateFilter.name = this.candidateForm.controls['name'].value;
        if (this.candidateForm.controls['yob'].value == '') {
          this.candidateFilter.yob = 0;
        } else {
          this.candidateFilter.yob = this.candidateForm.controls['yob'].value;
        }
        this.candidateFilter.phone = this.candidateForm.controls['phone'].value;
        this.candidateFilter.email = this.candidateForm.controls['email'].value;
        this.candidateFilter.location =
          this.candidateForm.controls['location'].value;
        this.candidateFilter.position =
          this.candidateForm.controls['position'].value;
        this.candidateFilter.yearExp = this.candidateForm.controls['exp'].value;
        this.candidateFilter.language =
          this.candidateForm.controls['languages'].value;

        this.loadData();
      });
  }
}
