import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { CommonService } from 'src/app/services/common.service';
import { ProfileService } from 'src/app/services/profile-service/profile.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { RequestService } from 'src/app/services/request-service/request.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.scss']
})
export class CreateContractComponent implements OnInit {
  route = { name: 'View all contract', link: '/thietlaphoso/hopdong?index=1&size=20' };

  orgForm!: FormGroup;
  mode!: string;
  contractEId!: 0;
  today: string = new Date().toISOString().slice(0, 10);
  department: any;
  contractTypeList!: any;
  employeeId!: 0;
  orgId!: 0;
  positionId!: 0;
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






  showPopUp() {
    this.orgPicker.fire();
  }

  getDataFromPopup(department: any) {
    this.department = department;
  }

  getEmp(emp: any) {
    this.employeeId = emp.id;
    this.orgForm.controls['emp'].setValue(emp.fullName);
    this.orgForm.controls['orgName'].setValue(emp.orgnizationName);
    this.orgForm.controls['position'].setValue(emp.positionName);
    this.orgId = emp.orgId;
    this.positionId = emp.positionId
  }
  ngOnInit() {
    this.mode = this.activatedRoute.snapshot.queryParams["mode"];
    this.contractEId = this.activatedRoute.snapshot.queryParams["id"];

    this.orgForm = this.fb.group({
      orgName: [{ value: '', disabled: true }],
      position: [{ value: '', disabled: true }],
      mngName: [{ value: '', disabled: true }],
      no: ['', [Validators.required]],
      type: ['', [Validators.required]],
      emp: [{ value: '', disabled: true }],
      effectdate: ['', [Validators.required]],
      exDate: [''],
      notes: ['']
    });

    this.profileServices.getContractType(0, 99999).subscribe((response: any) => {
      this.contractTypeList = response.data
    })


    if (this.mode == "New") {

    }
    else if (this.mode == "Edit") {
      this.getInfoById(this.contractEId);
    }
  }
  getInfoById(cId: number) {
    this.profileServices.getContractEmployeeById(cId).subscribe((response: any) => {
      this.orgId = response.data.orgnizationId;
      this.employeeId = response.data.employeeId;
      this.positionId = response.data.PositionId;
      this.orgForm.controls['no'].setValue(response.data.contractNo);
      this.orgForm.controls['orgName'].setValue(response.data.orgnizationName);
      this.orgForm.controls['position'].setValue(response.data.position);
      this.orgForm.controls['type'].setValue(response.data.contractTypeId);
      this.orgForm.controls['emp'].setValue(response.data.name);
      this.orgForm.controls['effectdate'].setValue(response.data.effectDate);
      this.orgForm.controls['exDate'].setValue(response.data.expireDate);
      this.orgForm.controls['notes'].setValue(response.data.note);
    })
  }
  onSubmit() {

    let exdate = this.orgForm.controls['exDate'].value == '' ? '1000-01-01T15:37:54.773Z' : this.orgForm.controls['dissdate'].value;
    let obj = {
      id: 0,
      orgnizationName: "",
      position: "",
      status: "",
      contractNo: this.orgForm.controls['no'].value,
      contractType: "",
      effectDate: this.orgForm.controls['effectdate'].value,
      expireDate: exdate,
      note: this.orgForm.controls['notes'].value,
      name: "",
      code: "",
      index: 0,
      size: 0,
      orgnizationId: this.orgId,
      positionId: this.positionId,
      contractTypeId: this.orgForm.controls['type'].value,
      employeeId: this.employeeId
    };

    if (this.mode == "New") {
      this.profileServices.insertContractEmp(obj).subscribe((response: any) => {
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
      obj.id = this.contractEId;
      this.profileServices.modifyContractEmp(obj).subscribe((response: any) => {
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


  clearInputField() {
    if (this.requestService.selectedRequest.id != 0) {
      /*      chưa làm*/
    }
  }
}

