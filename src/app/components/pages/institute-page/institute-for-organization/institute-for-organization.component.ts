import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { CommonService } from 'src/app/services/common.service';
import { ProfileService } from 'src/app/services/profile-service/profile.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { RequestService } from 'src/app/services/request-service/request.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-institute-for-organization',
  templateUrl: './institute-for-organization.component.html',
  styleUrls: ['./institute-for-organization.component.scss']
})
export class InstituteForOrganizationComponent implements OnInit {
  route = { name: 'Institute Orgnization', link: '/thietlaptochuc' };

  orgForm!: FormGroup;
  parentId!: number;
  mode!: string;
  nationList!: any;
  provinceList!: any;
  districtList!: any;
  wardList!: any;
  managerId!: 0;
  today: string = new Date().toISOString().slice(0, 10);
  department: any;
  emp: any;

  @ViewChild('orgPicker') orgPicker!: SwalComponent;
  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    public readonly swalTargets: SwalPortalTargets,
    private orgService: OrganizationService,
    private commonService: CommonService,
    private organizationService: OrganizationService,
    private profileServices: ProfileService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  innitCode() {
    this.commonService
      .autoGencode3Char('Orgnization', 'ORG')
      .subscribe((res: any) => {
        this.orgForm.controls['orgCode'].setValue(res);
      });
  }
  getOrgParent() {
    this.organizationService
      .getOrgByID(this.parentId)
      .subscribe((res: any) => {
        this.orgForm.controls['parentName'].setValue(res.data.name);
      });
  }

  renderProvince(change: any) {
    this.provinceList = [];
    this.districtList = [];
    this.wardList = [];
    let nationId = this.orgForm.controls['nations'].value
    this.profileServices.getProvinceByNationId(nationId).subscribe(
      (response: any) => {
        this.provinceList = response.data;
      },
      (err) => { }
    );
  }
  renderDistrict(change: any) {
    this.districtList = [];
    this.wardList = [];
    let nationId = this.orgForm.controls['provinces'].value
    this.profileServices.getDistrictByProvinceId(nationId).subscribe(
      (response: any) => {
        this.districtList = response.data;
      },
      (err) => { }
    );
  }

  renderWard(change: any) {
    this.wardList = [];
    let nationId = this.orgForm.controls['districts'].value
    this.profileServices.getWardByDistrictId(nationId).subscribe(
      (response: any) => {
        this.wardList = response.data;
      },
      (err) => { }
    );
  }

  ngOnInit() {
    this.mode = this.activatedRoute.snapshot.queryParams["mode"];
    this.parentId = this.activatedRoute.snapshot.queryParams["orgId"];
    this.orgForm = this.fb.group({
      orgCode: [{ value: '', disabled: true }],
      name: ['', [Validators.required]],
      parentName: [{ value: '', disabled: true }],
      dep: [{ value: '', disabled: true }],
      notes: [''],
      fax: [''],
      nations: [''],
      email: [''],
      numberBusiness: [''],
      provinces: [''],
      manager: [{ value: '', disabled: true }],
      phone: [''],
      address: ['', [Validators.required]],
      districts: [''],
      wards: [''],
      effectdate: ['', [Validators.required]],
      dissdate: ['']
    });
    this.profileServices.getNationList().subscribe((res: any) => {
      this.nationList = res.data;
    });

    if (this.mode == "new") {
      this.extendFromParent();
      this.innitCode();
      this.getOrgParent();
    }
    else if (this.mode == "edit") {
      this.getOrgInformation();
    }





  }
  onSubmit() {
    let nationId = this.orgForm.controls['nations'].value == '' ? 0 : this.orgForm.controls['nations'].value;
    let provinceId = this.orgForm.controls['provinces'].value == '' ? 0 : this.orgForm.controls['provinces'].value;
    let districtId = this.orgForm.controls['districts'].value == '' ? 0 : this.orgForm.controls['districts'].value;
    let wardId = this.orgForm.controls['wards'].value == '' ? 0 : this.orgForm.controls['wards'].value;
    let disDate = this.orgForm.controls['dissdate'].value == '' ? '1000-01-01T15:37:54.773Z' : this.orgForm.controls['dissdate'].value;
    let mngID = this.managerId == null ? 0 : this.managerId
    let obj = {
      id: 0,
      name: this.orgForm.controls['name'].value,
      code: this.orgForm.controls['orgCode'].value,
      parentID: this.parentId,
      level: 0,
      createDate: Date.now,
      efectDate: this.orgForm.controls['effectdate'].value,
      dissolutionDate: disDate,
      status: -1,
      note: this.orgForm.controls['notes'].value,
      fax: this.orgForm.controls['fax'].value,
      email: this.orgForm.controls['email'].value,
      mobile: this.orgForm.controls['phone'].value,
      numberBussines: this.orgForm.controls['numberBusiness'].value,
      address: this.orgForm.controls['address'].value,
      nationID: nationId,
      provinceID: provinceId,
      districtID: districtId,
      wardID: wardId,
      managerID: mngID
    };

    if (this.mode == "new") {
      this.organizationService.insertOrg(obj).subscribe((response: any) => {
        if (response.status == true) {
          this.commonService.popUpSuccess()
        } else {
          this.commonService.popUpFailed('Insert Failed')
        }
      }, (err) => {
          this.commonService.popUpFailed('Insert Failed')
      })
    }
    else {
      obj.id = this.parentId
      this.organizationService.modifyOrg(obj).subscribe((response: any) => {
        if (response.status == true) {
          this.commonService.popUpSuccess()
        } else {
          this.commonService.popUpFailed('Modify Failed')
        }
      }, (err) => {
          this.commonService.popUpFailed('Modify Failed')
      })
    }

  }
  showPopUp() {
    this.orgPicker.fire();
  }

  getDataFromPopup(department: any) {
    this.department = department;
  }

  getDataFromPopup2(department: any) {
  }

  getEmp(emp: any) {
    this.emp = emp;
    this.managerId = emp.id;
    this.orgForm.controls['manager'].setValue(emp.fullName);
  }
  resetPositionField() {
    this.orgForm.controls['position']?.reset();
  }
  clearInputField() {
    if (this.requestService.selectedRequest.id != 0) {
/*      chưa làm*/
    }
  }
  extendFromParent() {
    let parentRequest = this.requestService.selectedRequest;
    if (parentRequest.id != 0) {
      this.orgForm.controls['dep'].setValue(parentRequest.orgnizationID);
    }
  }


  getOrgInformation() {
    this.organizationService
      .getOrgByID(this.parentId)
      .subscribe((res: any) => {
        this.orgForm.controls['orgCode'].setValue(res.data.code);
        this.orgForm.controls['name'].setValue(res.data.name);
        this.orgForm.controls['parentName'].setValue(res.data.parentName);
        this.orgForm.controls['notes'].setValue(res.data.name);
        this.orgForm.controls['fax'].setValue(res.data.fax);
        this.orgForm.controls['nations'].setValue(res.data.nationID);
        this.renderProvince(res.data.nationID);
        this.orgForm.controls['email'].setValue(res.data.email);
        this.orgForm.controls['numberBusiness'].setValue(res.data.numberBusiness);
        this.orgForm.controls['provinces'].setValue(res.data.provinceID);
        this.renderDistrict(res.data.provinceID);
        this.orgForm.controls['manager'].setValue(res.data.managerName);
        this.orgForm.controls['phone'].setValue(res.data.phoneNumber);
        this.orgForm.controls['address'].setValue(res.data.address);
        this.orgForm.controls['districts'].setValue(res.data.districtID);
        this.renderWard(res.data.districtID);
        this.orgForm.controls['wards'].setValue(res.data.wardID);
        this.orgForm.controls['effectdate'].setValue(res.data.effectDate.slice(0, 10));
        this.orgForm.controls['notes'].setValue(res.data.note);
        this.managerId = res.data.managerID;
        console.log(res.data.managerID);
        this.orgForm.controls['dissdate'].setValue(res.data.dissolutionDate.slice(0, 10));
      });
  }
}

