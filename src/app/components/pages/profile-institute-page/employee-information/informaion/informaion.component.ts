import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { CommonService } from 'src/app/services/common.service';
import { ProfileService } from 'src/app/services/profile-service/profile.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { RequestService } from 'src/app/services/request-service/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUpload } from 'src/app/models/FileUpload';
@Component({
  selector: 'app-informaion',
  templateUrl: './informaion.component.html',
  styleUrls: ['./informaion.component.scss'],
})
export class InformaionComponent implements OnInit {
  route = { name: 'Create Orgnization', link: '/thietlaptochuc' };

  orgForm!: FormGroup;
  empId!: number;
  mode!: string;
  nationList!: any;
  provinceList!: any;
  districtList!: any;
  wardList!: any;
  provinceResList!: any;
  districtResList!: any;
  wardResList!: any;
  statusList!: any;
  languageList!: any;
  skillList1!: any;
  skillList2!: any;
  learLevel!: any;
  informaticList!: any;
  ethnicList!: any;
  managerId!: 0;
  today: string = new Date().toISOString().slice(0, 10);
  department: any;
  emp: any;
  url: any;

  name=''
  fileUpLoad!: FileUpload;
  selectedFiles!: FileList;
  downloadURL = '';
  pdfSrc: any;
  @ViewChild('orgPicker') orgPicker!: SwalComponent;
  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    public readonly swalTargets: SwalPortalTargets,

    private commonService: CommonService,

    private profileServices: ProfileService,

   
    private storage: AngularFireStorage,
    private activatedRoute: ActivatedRoute
  ) {}

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    this.upload();
  }
  getExtendsionFile(fileName: string) {
    return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
  }
  upload(): void {
    const file = this.selectedFiles.item(0) as File;
    let typeFile = this.getExtendsionFile(file.name).toLowerCase();

    if ((typeFile == 'jpg' || typeFile == 'png') && file.size < 5000000) {
      var storageRef = this.storage.ref('uploads/' + this.empId);
      storageRef.listAll().subscribe((result: any) => {
        if (result.items.length > 0) {
          this.commonService.deleteFile(this.downloadURL);
        }
      });
      this.fileUpLoad = new FileUpload(file);

      this.commonService
        .pushFileToStorage(this.fileUpLoad, this.empId.toString())
        .subscribe(
          (percentage: any) => {
            // this.percentage = Math.round(percentage ? percentage : 0);
            this.loadCV();
            this.commonService.headerBehavior.next(true)
          },
          (error: any) => {}
        );
    } else {
      this.commonService.popUpFailed('Must import pdf file and less than 5mb');
    }
  }
  loadCV() {
    // this.isLoaded = false;

    var storageRef = this.storage.ref(`uploads/${this.empId}`);
    // this.uvcode = response.data[0].code;

    storageRef.listAll().subscribe(
      (result: any) => {
        if (result.items.length > 0) {
          result.items.forEach((imageRef: any) => {
            // And finally display them

            let extendsionFile = imageRef.name.slice(
              ((imageRef.name.lastIndexOf('.') - 1) >>> 0) + 2
            );

            if (
              extendsionFile.toLowerCase() == 'jpg' ||
              extendsionFile.toLowerCase() == 'png'
            ) {
              imageRef.getDownloadURL().then((url: any) => {
                this.downloadURL = url;
                this.url = url;

                // this.isLoaded = true;
              });
            }
            // this.isLoaded = true;
          });
        } else {
          // this.isLoaded = true;
        }
      },
      (error) => {
        // this.isLoaded = true;
        // this.commonService.popUpFailed('Get CV failed!!!');
      }
    );
  }

  renderProvince(change: any) {
    this.provinceList = [];
    this.districtList = [];
    this.wardList = [];
    let nationId = this.orgForm.controls['noiNation'].value;
    this.profileServices.getProvinceByNationId(nationId).subscribe(
      (response: any) => {
        this.provinceList = response.data;
      },
      (err) => {}
    );
  }

  renderResProvince(change: any) {
    this.provinceResList = [];
    this.districtResList = [];
    this.wardResList = [];
    let nationId = this.orgForm.controls['resNation'].value;
    this.profileServices.getProvinceByNationId(nationId).subscribe(
      (response: any) => {
        this.provinceResList = response.data;
      },
      (err) => {}
    );
  }

  renderResDistrict(change: any) {
    this.districtResList = [];
    this.wardResList = [];
    let nationId = this.orgForm.controls['resProvince'].value;
    this.profileServices.getDistrictByProvinceId(nationId).subscribe(
      (response: any) => {
        this.districtResList = response.data;
      },
      (err) => {}
    );
  }

  renderDistrict(change: any) {
    this.districtList = [];
    this.wardList = [];
    let nationId = this.orgForm.controls['noiProvince'].value;
    this.profileServices.getDistrictByProvinceId(nationId).subscribe(
      (response: any) => {
        this.districtList = response.data;
      },
      (err) => {}
    );
  }

  renderWard(change: any) {
    this.wardList = [];
    let nationId = this.orgForm.controls['noiDistrict'].value;
    this.profileServices.getWardByDistrictId(nationId).subscribe(
      (response: any) => {
        this.wardList = response.data;
      },
      (err) => {}
    );
  }

  renderResWard(change: any) {
    this.wardResList = [];
    let nationId = this.orgForm.controls['resDistrict'].value;
    this.profileServices.getWardByDistrictId(nationId).subscribe(
      (response: any) => {
        this.wardResList = response.data;
      },
      (err) => {}
    );
  }

  renderSkill1(change: any) {
    this.skillList1 = [];
    let nationId = this.orgForm.controls['language1'].value;
    this.commonService.getOtherListByAttribute(nationId).subscribe(
      (response: any) => {
        this.skillList1 = response.data;
      },
      (err) => {}
    );
  }
  renderSkill2(change: any) {
    this.skillList2 = [];
    let nationId = this.orgForm.controls['language2'].value;
    this.commonService.getOtherListByAttribute(nationId).subscribe(
      (response: any) => {
        this.skillList2 = response.data;
      },
      (err) => {}
    );
  }

  ngOnInit() {
    this.empId = this.activatedRoute.snapshot.queryParams['id'];
    this.orgForm = this.fb.group({
      empid: [{ value: '', disabled: true }, [Validators.required]],
      orgName: [{ value: '', disabled: true }, [Validators.required]],
      empfirst: [{ value: '', disabled: true }, [Validators.required]],
      gender: ['', [Validators.required]],
      email: [''],
      quoctich: [''],
      hokhau: [''],
      resDistrict: [''],
      noio: ['', [Validators.required]],
      noiDistrict: ['', [Validators.required]],
      llvel: [''],
      deegree: [''],
      language1: [''],
      language2: [''],
      empLast: [{ value: '', disabled: true }, [Validators.required]],
      dob: ['', [Validators.required]],
      cmnd: [{ value: '', disabled: true }],
      resNation: [''],
      resWard: [''],
      noiNation: ['', [Validators.required]],
      noiWard: ['', [Validators.required]],
      school: [''],
      award: [''],
      skill1: [''],
      skill2: [''],
      status: [{ value: '', disabled: true }, [Validators.required]],
      empFullName: [{ value: '', disabled: true }, [Validators.required]],
      provinces: [''],
      resProvince: [''],
      noiProvince: ['', [Validators.required]],
      major: [''],
      infl: [''],
      score1: [''],
      score2: [''],
      cmndPlace: [{ value: '', disabled: true }],
      phone: ['', [Validators.required]],
      workEmail: [{ value: '', disabled: true }, [Validators.required]],
      joinDate: [{ value: '', disabled: true }, [Validators.required]],
      outDate: [{ value: '', disabled: true }],
      position: [{ value: '', disabled: true }],
      ethnic: [''],
    });
    this.profileServices.getNationList().subscribe((res: any) => {
      this.nationList = res.data;
    });

    this.commonService
      .getOtherList('EMPSTS', 0, 9999)
      .subscribe((response: any) => {
        console.log(response);
        this.statusList = response.data;
      });

    this.commonService
      .getOtherList('LEARN_LV', 0, 9999)
      .subscribe((response: any) => {
        console.log(response);
        this.learLevel = response.data;
      });

    this.commonService
      .getOtherList('INF_MATIC', 0, 9999)
      .subscribe((response: any) => {
        console.log(response);
        this.informaticList = response.data;
      });

    this.commonService
      .getOtherList('LANGUAGE', 0, 9999)
      .subscribe((response: any) => {
        console.log(response);
        this.languageList = response.data;
      });

    this.commonService
      .getOtherList('ETHNIC', 0, 9999)
      .subscribe((response: any) => {
        console.log(response);
        this.ethnicList = response.data;
      });

    // this.url =
    //   'https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png';

    this.getEmpInformation();
    this.loadCV()
  }
  onSubmit() {
    let obj = {
      id: this.empId,
      gender: this.orgForm.controls['gender'].value,
      dob: this.orgForm.controls['dob'].value,
      phoneNumber: this.orgForm.controls['phone'].value,
      email: this.orgForm.controls['email'].value,
      danToc: this.orgForm.controls['ethnic'].value,
      quocTich: this.orgForm.controls['quoctich'].value,
      hoKhau: this.orgForm.controls['hokhau'].value,
      nationHK: this.orgForm.controls['resNation'].value,
      provinceHK: this.orgForm.controls['resProvince'].value,
      districtHK: this.orgForm.controls['resDistrict'].value,
      wardHK: this.orgForm.controls['resWard'].value,
      noiO: this.orgForm.controls['noio'].value,
      nationNoiO: this.orgForm.controls['noiNation'].value,
      provinceNoiO: this.orgForm.controls['noiProvince'].value,
      districtNoiO: this.orgForm.controls['noiDistrict'].value,
      wardNoiO: this.orgForm.controls['noiWard'].value,
      learningLV: this.orgForm.controls['llvel'].value,
      school: this.orgForm.controls['school'].value,
      major: this.orgForm.controls['major'].value,
      degree: this.orgForm.controls['deegree'].value,
      award: this.orgForm.controls['award'].value,
      informaticLV: this.orgForm.controls['infl'].value,
      language1: this.orgForm.controls['language1'].value,
      language2: this.orgForm.controls['language2'].value,
      skill1: this.orgForm.controls['skill1'].value,
      skill2: this.orgForm.controls['skill2'].value,
      score1: this.orgForm.controls['score1'].value,
      score2: this.orgForm.controls['score2'].value,
    };

    this.profileServices.modifyEmployee(obj).subscribe(
      (response: any) => {
        if (response.data == true) {
          this.commonService.popUpSuccess();
        } else {
          this.commonService.popUpFailed('Modify Failed');
        }
      },
      (err) => {
        this.commonService.popUpFailed('Modify Failed');
      }
    );
  }

  clearInputField() {
    if (this.requestService.selectedRequest.id != 0) {
      /*      ch??a l??m*/
    }
  }

  getEmpInformation() {
    this.profileServices
      .getProfileOfEmployee(this.empId)
      .subscribe((res: any) => {
        let nameSplit=res.data.lastName.split(' ')
        this.name=nameSplit[nameSplit.length-1].charAt(0)
        
        this.orgForm.controls['orgName'].setValue(res.data.orgnizationName);
        this.orgForm.controls['empFullName'].setValue(res.data.fullName);
        this.orgForm.controls['empid'].setValue(res.data.code);
        this.orgForm.controls['status'].setValue(res.data.statusId);
        this.orgForm.controls['status'].setValue(res.data.statusId);
        this.orgForm.controls['quoctich'].setValue(res.data.quocTich);
        this.orgForm.controls['position'].setValue(res.data.positionName);
        this.orgForm.controls['empfirst'].setValue(res.data.firstName);
        this.orgForm.controls['empLast'].setValue(res.data.lastName);
        this.orgForm.controls['gender'].setValue(res.data.gender);
        this.orgForm.controls['phone'].setValue(res.data.phoneNumber);
        this.orgForm.controls['email'].setValue(res.data.email);
        this.orgForm.controls['workEmail'].setValue(res.data.workEmail);
        this.orgForm.controls['ethnic'].setValue(res.data.danToc);
        this.orgForm.controls['quoctich'].setValue(res.data.quocTich);
        this.orgForm.controls['cmnd'].setValue(res.data.cmnd);
        this.orgForm.controls['cmndPlace'].setValue(res.data.cmnD_Place);

        this.orgForm.controls['hokhau'].setValue(res.data.hoKhau);
        this.orgForm.controls['resNation'].setValue(res.data.nationHK);
        this.renderResProvince(1);
        this.orgForm.controls['resProvince'].setValue(res.data.provinceHK);
        this.renderResDistrict(1);
        this.orgForm.controls['resDistrict'].setValue(res.data.districtHK);
        this.renderResWard(1);
        this.orgForm.controls['resWard'].setValue(res.data.wardHK);

        this.orgForm.controls['noio'].setValue(res.data.noiO);
        this.orgForm.controls['noiNation'].setValue(res.data.nationNoiO);
        this.renderProvince(1);
        this.orgForm.controls['noiProvince'].setValue(res.data.provinceNoiO);
        this.renderDistrict(1);
        this.orgForm.controls['noiDistrict'].setValue(res.data.districtNoiO);
        this.renderWard(1);
        this.orgForm.controls['noiWard'].setValue(res.data.wardNoiO);

        this.orgForm.controls['llvel'].setValue(res.data.learningLV);
        this.orgForm.controls['school'].setValue(res.data.school);
        this.orgForm.controls['award'].setValue(res.data.award);
        this.orgForm.controls['major'].setValue(res.data.major);
        this.orgForm.controls['deegree'].setValue(res.data.degree);
        this.orgForm.controls['infl'].setValue(res.data.informaticLV);
        this.orgForm.controls['language1'].setValue(res.data.language1);
        this.renderSkill1(1);
        this.orgForm.controls['skill1'].setValue(res.data.skill1);
        this.orgForm.controls['language2'].setValue(res.data.language2);
        this.renderSkill2(1);
        this.orgForm.controls['skill2'].setValue(res.data.skill2);

        this.orgForm.controls['score1'].setValue(res.data.score1);
        this.orgForm.controls['score2'].setValue(res.data.score2);

        this.orgForm.controls['joinDate'].setValue(
          res.data.joinDate.slice(0, 10)
        );
        this.orgForm.controls['dob'].setValue(res.data.dob.slice(0, 10));
      });
  }
}
