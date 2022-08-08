import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from 'src/app/models/Candidate';
import { FileUpload } from 'src/app/models/FileUpload';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-candidate-page',
  templateUrl: './edit-candidate-page.component.html',
  styleUrls: ['./edit-candidate-page.component.scss'],
})
export class EditCandidatePageComponent implements OnInit {
  name = 'Candidate';
  isLoaded = true;
  route = { name: 'Edit Candidate', link: '/ungvien' };
  attach = { name: 'Attach CV' };
  isTabOne=true
  pdfSrc = '';
  fileUpLoad!: FileUpload;
  step = 1;
  candidate: any;
  formCandite: any;
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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute
    .queryParams
    .subscribe(params => {
        let thing = params['id'];

    });

  }
  getPdfSrc(src: string) {
    this.pdfSrc = src;
  }
  getStep(step: number) {
    this.step = step;
  }
  getName(name: string) {
    this.name = name;
    console.log(this.name)
  }
  getCandidate($event: any) {
    this.candidate = $event.value;
    this.formCandite = $event;
  }
  getlistExp(arr: any) {
    if (arr) {

      this.objForAPI.listExp = arr;
      console.log(this.objForAPI.listExp);
    }
  }
  getSkill(arr: any) {
    this.objForAPI.listSkill = arr;

  }
  getFileUpLoad($event: FileUpload) {
    this.fileUpLoad = $event;
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
                    if (!this.fileUpLoad) {
                      // let file:FileUpload =  new FileUpload();
                    }
                    this.commonService
                      .pushFileToStorage(this.fileUpLoad, folderCandidate)
                      .subscribe(
                        (percentage: any) => {},
                        (error: any) => {}
                      );

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

  changeTab(is:boolean){
    this.isTabOne=is
  }
  
}
