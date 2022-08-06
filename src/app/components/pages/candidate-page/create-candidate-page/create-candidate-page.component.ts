import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Candidate } from 'src/app/models/Candidate';
import { FileUpload } from 'src/app/models/FileUpload';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-candidate-page',
  templateUrl: './create-candidate-page.component.html',
  styleUrls: ['./create-candidate-page.component.scss'],
})
export class CreateCandidatePageComponent implements OnInit, OnDestroy {
  @Input('name') name = 'Candidate';
  isLoaded = true;
  route = { name: 'Create New Candidate', link: '/ungvien' };
  attach = { name: 'Attach CV' };
  imgURL!: FileUpload;
  pdfSrc = '';
  fileUpLoad!: FileUpload;
  step = 1;
  candidate: any;
  formCandite: any;
  isEmpty = false;
  objForAPI: Candidate = {
    fullName: '',
    dob: '1000-01-01T15:37:54.773Z',
    gender: 0,
    phone: '',
    zalo: '',
    email: '',
    linkedIn: '',
    facebook: '',
    skype: '',
    website: '',
    twiter: '',
    noiO: '',
    nationLive: 0,
    porvinceLive: 0,
    districtLive: 0,
    wardLive: 0,
    major: '',
    graduate: '1000-01-01T15:37:54.773Z',
    school: '',
    gpa: 0,
    awards: '',
    listSkill: [
      {
        typeSkill: 0,
        type: 0,
        level: 0,
        goal: '',
      },
    ],
    listExp: [],
    recordStatus: 0,
  };
  constructor(
    private commonService: CommonService,
    private candidateService: CandidateService,
    public sanitizer: DomSanitizer,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    // this.commonService.deleteFile(this.commonService.fileUrl);
  }

  ngOnInit(): void {}
  getPdfSrc(src: string) {
    this.pdfSrc = src;
  }
  getStep(step: number) {
    this.step = step;
  }
  getName(name: string) {
    this.name = name;
  }
  onSubmit(action: string) {
    this.commonService.emitBahavior.next(true);
    console.log(this.objForAPI);
    (this.objForAPI.fullName = this.candidate.name.trim()),
      (this.objForAPI.gender = this.candidate.gender.value),
      (this.objForAPI.phone = this.candidate.phone),
      (this.objForAPI.zalo = this.candidate.zalo),
      (this.objForAPI.email = this.candidate.email),
      (this.objForAPI.linkedIn = this.candidate.linkedIn),
      (this.objForAPI.facebook = this.candidate.facebook),
      (this.objForAPI.skype = this.candidate.skype),
      (this.objForAPI.website = this.candidate.website),
      (this.objForAPI.twiter = this.candidate.twitter),
      (this.objForAPI.skype = this.candidate.skype),
      (this.objForAPI.website = this.candidate.website),
      (this.objForAPI.noiO = ''),
      (this.objForAPI.nationLive = this.candidate.country.id),
      (this.objForAPI.porvinceLive = this.candidate.city.id),
      (this.objForAPI.districtLive = 0),
      (this.objForAPI.wardLive = 0),
      (this.objForAPI.major = this.candidate.major),
      (this.objForAPI.school = this.candidate.university),
      (this.objForAPI.gpa = this.candidate.gpa),
      (this.objForAPI.awards = this.candidate.awards);
    if (this.candidate.graduate != '') {
      this.objForAPI.graduate = this.candidate.graduate;
    }
    if (this.candidate.dob != '') {
      this.objForAPI.dob = this.candidate.dob;
    }
    if (action == 'submit') {
      this.objForAPI.recordStatus = 1;
    }
    if (action == 'draft') {
      this.objForAPI.recordStatus = 0;
    }
    console.log(this.objForAPI);
    Swal.fire({
      text: 'Are you sure to create candidate',
      iconHtml:
        ' <img src="../../../assets/images/icons/ques.jpg" width="100px" alt="">',
      showCancelButton: true,
      confirmButtonColor: '#309EFC',
      cancelButtonColor: '#8B94B2',
      confirmButtonText: 'Confirm',
      width: '380px',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoaded = false;
        (document?.querySelector('.overlay') as HTMLElement).style.display =
          'block';
        let checkObj = {
          phone: this.candidate.phone,
          zalo: this.candidate.zalo,
          email: this.candidate.email,
          linkIn: this.candidate.linkedIn,
          faceBook: this.candidate.facebook,
          twitter: this.candidate.twitter,
          skype: this.candidate.skype,
          website: this.candidate.website,
        };

        this.candidateService
          .CheckDuplicateCandidate(checkObj)
          .subscribe((response: any) => {
            let rq = response.data;
            if (rq.check == false) {
              this.isLoaded = true;
              (
                document?.querySelector('.overlay') as HTMLElement
              ).style.display = 'none';
              this.commonService.popUpFailed(rq.mess);
            } else {
              this.candidateService.insertCandidate(this.objForAPI).subscribe(
                (response: any) => {
                  if (response.status == true) {
                    (
                      document?.querySelector('.overlay') as HTMLElement
                    ).style.display = 'none';
                    this.isLoaded = true;
                    this.commonService.popUpSuccess();
                    let folderCandidate = response.code;
                    if (this.fileUpLoad) {
                      console.log('vao day');
                      // let file:FileUpload =  new FileUpload();
                      this.commonService
                        .pushFileToStorage(this.fileUpLoad, folderCandidate)
                        .subscribe(
                          (percentage: any) => {},
                          (error: any) => {}
                        );
                    }
                    if (this.imgURL) {
                      this.commonService
                        .pushFileToStorage(this.imgURL, folderCandidate)
                        .subscribe(
                          (percentage: any) => {},
                          (error: any) => {}
                        );
                    }

                    this.router.navigateByUrl(
                      'ungvien/xemungvien?index=1&size=20'
                    );
                  } else {
                    (
                      document?.querySelector('.overlay') as HTMLElement
                    ).style.display = 'none';
                    this.isLoaded = true;
                    this.commonService.popUpFailed('Insert failed!!!');
                  }
                },
                (err) => {
                  (
                    document?.querySelector('.overlay') as HTMLElement
                  ).style.display = 'none';
                  this.isLoaded = true;
                  this.commonService.popUpFailed('Insert failed!!!');
                }
              );
            }
          });
      }
    });
  }
  getCandidate($event: any) {
    this.candidate = $event.value;
    this.formCandite = $event;
  }
  getlistExp(arr: any) {
    if (arr) {
      this.objForAPI.listExp = arr;
      this.isEmpty=this.allAreNull(arr)
    }
  }
  allAreNull(arr: any) {
    let isEmpty = false;

    for (const item of arr) {
      if (item.firm == '') {
        isEmpty = true;
      }
      if (item.positiob == '') {
        isEmpty = true;
      }
      if (item.time == '') {
        isEmpty = true;
      }
    }

    return isEmpty;
  }
  getSkill(arr: any) {
    this.objForAPI.listSkill = arr;
    console.log(arr);
  }
  getFileUpLoad($event: FileUpload) {
    this.fileUpLoad = $event;
    console.log(this.fileUpLoad);
  }
  getImgURL($event: any) {
    this.imgURL = $event;
  }
}
