import { debounceTime } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateFilter } from 'src/app/models/CandidateFilter';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { AuthorizeService } from 'src/app/services/authorize.service';
@Component({
  selector: 'app-view-candidate-page',
  templateUrl: './view-candidate-page.component.html',
  styleUrls: ['./view-candidate-page.component.scss'],
})
export class ViewCandidatePageComponent implements OnInit, OnDestroy {
  route = { name: 'View Candidates', link: 'ungvien' };
  itemsPerPage = 20;
  totalItems!: number;
  page: number = 1;
  isLoaded: boolean = false;
  listCandidate: any;
  candidateFilter!: CandidateFilter;
  candidateForm!: FormGroup;
  role!: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    public candidateService: CandidateService,
    private router: Router,
    private fb: FormBuilder,
    private commonService: CommonService,
    private auth: AuthorizeService
  ) {}
  ngOnDestroy(): void {
    this.candidateService.listSelectedCandidate = [];
  }

  ngOnInit(): void {
    this.auth.userSubject.subscribe((user) => {
      if (user) {
        this.role = user.rule;
      }
    });
    this.candidateFilter = new CandidateFilter();
    this.initForm();
    this.isLoaded = false;
    this.page = this.activatedRoute.snapshot.queryParams['index'];
    this.itemsPerPage = this.activatedRoute.snapshot.queryParams['size'];
    this.candidateFilter.index = this.page - 1;
    this.candidateFilter.size = this.itemsPerPage;
    this.loadData();
  }
  loadData() {
    this.candidateService.matchingBehavior.subscribe((change) => {
      this.clearData();

      this.candidateService
        .getAllcandidateByFilter(this.candidateFilter)
        .subscribe(
          (response: any) => {
            this.isLoaded = true;

            this.listCandidate = response.data;
            console.log(this.listCandidate)
            this.totalItems = response.totalItem;
            this.listCandidate.forEach((e: any) => {
              this.candidateService.listSelectedCandidate.forEach((c: any) => {
                if (e.id == c.id) {
                  e.isSelected = true;
                }
              });
            });
          },
          (err) => {
            this.isLoaded = true;
          }
        );
    });
  }

  addNewCandidate() {
    this.router.navigateByUrl('ungvien/taoungvien');
  }
  deleteCandidate() {
    if (this.candidateService.listSelectedCandidate.length <= 0) {
      this.commonService.popUpMessage('Choose at least one record!!!');
    } else {
      Swal.fire({
        text: 'Are you sure to delete candidate',
        iconHtml:
          ' <img src="../../../assets/images/icons/ques.jpg" width="100px" alt="">',
        showCancelButton: true,
        confirmButtonColor: '#309EFC',
        cancelButtonColor: '#8B94B2',
        confirmButtonText: 'Confirm',
        width: '380px',
      }).then((result) => {
        if (result.isConfirmed) {
          let newIDS = this.candidateService.listSelectedCandidate.map(
            (c: any) => c.id
          );
          this.candidateService
            .deleteCandidate(newIDS)
            .subscribe(
              (res: any) => {
                if (res.status == true) {
                  this.loadData();
                  this.commonService.popUpSuccess();
                  this.candidateService.listSelectedCandidate = [];
                } else {
                  this.commonService.popUpFailed(
                    'Some records have been appplied'
                  );
                }
              },
              (err) => {
                this.commonService.popUpFailed(
                  'Some records have been appplied'
                );
              }
            );
        }
      });
    }
  }
  active() {
    if (this.candidateService.listSelectedCandidate.length <= 0) {
      this.commonService.popUpMessage('Choose at least one record!!!');
    } else {
      let newIDS = this.candidateService.listSelectedCandidate.map(
        (c: any) => c.id
      );
      this.candidateService.activeCandidate(newIDS).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loadData();
            this.commonService.popUpSuccess();
            this.candidateService.listSelectedCandidate = [];
          } else {
            this.commonService.popUpFailed('Some records have been appplied');
          }
        },
        (err) => {
          this.commonService.popUpFailed('Some records have been appplied');
        }
      );
    }
  }
  deactive() {
    if (this.candidateService.listSelectedCandidate.length <= 0) {
      this.commonService.popUpMessage('Choose at least one record!!!');
    } else {
      Swal.fire({
        title: 'Deactive reason',
        input: 'text',

        showCancelButton: true,
        confirmButtonText: 'Deactive',
        showLoaderOnConfirm: true,
        inputPlaceholder: 'Why you deactive this candidate?',

        inputAttributes: {
          autocapitalize: 'off',
        },

        preConfirm: (value) => {
          if (!value) {
            Swal.showValidationMessage('You need to write something!');
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          let newIDS = this.candidateService.listSelectedCandidate.map(
            (c: any) => c.id
          );
          this.candidateService
            .deActiveCandidate(result.value as any, newIDS)
            .subscribe(
              (res: any) => {
                if (res.status == true) {
                  this.loadData();
                  this.commonService.popUpSuccess();
                  this.candidateService.listSelectedCandidate = [];
                } else {
                  this.commonService.popUpFailed(
                    'Some candidate have been appplied in request'
                  );
                }
              },
              (err) => {
                this.commonService.popUpFailed(
                  'Some candidate have been appplied in request'
                );
              }
            );
        }
      });
    }
  }
  editCandidate() {
    this.router.navigateByUrl('ungvien/taoungvien');
  }
  exportExcel() {
    var listExport = [];
    for (let i = 0; i < this.listCandidate.length; i++) {
      let obj = {
        CandidateID: this.listCandidate[i].code,
        CandidateName: this.listCandidate[i].name,
        YearOfBirth: this.listCandidate[i].yob,
        Phone: this.listCandidate[i].phoneNumber,
        Email: this.listCandidate[i].email,
        Location: this.listCandidate[i].location,
        LastPosition: this.listCandidate[i].lastestPosition,
        Experience: this.listCandidate[i].experience,
        Language: this.listCandidate[i].language,
        Status: this.listCandidate[i].statusName,
      };
      listExport.push(obj);
    }
    this.commonService.exportExcel(listExport, 'ListCandidate');
  }
  gty(page: number) {
    this.isLoaded = false;

    this.router.navigateByUrl(
      `/ungvien/xemungvien?index=${page}&size=${this.itemsPerPage}`
    );

    this.clearData();
    this.candidateFilter.index = page - 1;
    this.loadData();
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
      .pipe(debounceTime(2000))
      .subscribe((selectedValue) => {
        this.candidateFilter.name = this.candidateForm.controls['name'].value;
        if (this.candidateForm.controls['yob'].value != '') {
          this.candidateFilter.yob = this.candidateForm.controls['yob'].value;
        }
        if (this.candidateForm.controls['yob'].value == '') {
          this.candidateFilter.yob = 0;
        }
    
        this.candidateFilter.phone = this.candidateForm.controls['phone'].value;
        this.candidateFilter.email = this.candidateForm.controls['email'].value;
        this.candidateFilter.location =
          this.candidateForm.controls['location'].value;
        this.candidateFilter.position =
          this.candidateForm.controls['position'].value;
        this.candidateFilter.yearExp = this.candidateForm.controls['exp'].value;
        // this.candidateFilter.yearExp = '';
        this.candidateFilter.language =
          this.candidateForm.controls['languages'].value;
       
        this.loadData();
      });
  }
  navigateToView(candidate: any) {
    this.router.navigateByUrl(
      `ungvien/xemungvien/info?id=${candidate.id}&prePage=${this.page}`
    );
  }
  selectedChange(candidate: any, event: any) {
    if (event.target.checked) {
      this.candidateService.listSelectedCandidate.push(candidate);
      let wrapper = event.target.parentElement;
      let parent = wrapper.parentElement;
      parent.classList.add('selected');
    } else {
      let index = this.candidateService.listSelectedCandidate.findIndex(
        (c: any) => c.id == candidate.id
      );
      let wrapper = event.target.parentElement;
      let parent = wrapper.parentElement;
      parent.classList.remove('selected');
      this.candidateService.listSelectedCandidate.splice(index, 1);
    }
  }
}
