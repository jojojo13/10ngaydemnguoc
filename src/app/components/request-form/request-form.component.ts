import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { AuthorizeService } from 'src/app/services/authorize.service';
import { CommonService } from 'src/app/services/common.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { RequestService } from 'src/app/services/request-service/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
})
export class RequestFormComponent implements OnInit {
  route = {
    name: 'Create request',
    link: '/yeucautuyendung/xemyeucau?index=1&size=20',
  };
  listPosition: any;
  requestForm!: UntypedFormGroup;
  today: string = new Date().toISOString().slice(0, 10);
  types: any;
  levels: any;
  skills: any;
  projects: any;
  officeID!: number;
  departmentID!: number;
  managerID!: number;
  isLoaded = false;
  isChild = false;
  user: any;

  @ViewChild('orgPicker') orgPicker!: SwalComponent;
  constructor(
    private fb: UntypedFormBuilder,
    private requestService: RequestService,
    public readonly swalTargets: SwalPortalTargets,
    private orgService: OrganizationService,
    private commonService: CommonService,
    private router: Router,
    private auth: AuthorizeService
  ) {}

  ngOnInit() {
    this.isLoaded = true;
    this.requestForm = this.fb.group({
      requestCode: [{ value: '', disabled: true }],
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      dep: [{ value: '', disabled: true }, [Validators.required]],
      projects: ['', [Validators.required]],
      position: ['', [Validators.required]],
      quantity: [
        '',
        [Validators.pattern('^[1-9][0-9]*$'), Validators.required],
      ],
      office: [{ value: '', disabled: true }],
      deadline: ['', [Validators.required, this.dateValidator]],
      experience: ['', [Validators.pattern('^[1-9][0-9]*$')]],
      level: [''],
      skill: [''],
      notes: [''],
    });
    this.commonService
      .getOtherList('RC_TYPE', 0, 9999)
      .subscribe((response: any) => {
        this.types = response.data;
      });
    this.commonService
      .getOtherList('RC_LEVEL', 0, 9999)
      .subscribe((response: any) => {
        this.levels = response.data;
      });
    this.requestService
      .getAutoGenerateCODE(
        'Rc_Request',
        this.requestService.selectedRequest.rank + 1,
        'Rank',
        this.requestService.selectedRequest.id
      )
      .subscribe((code) => {
        this.requestForm.controls['requestCode'].setValue(code);
      });
    this.commonService
      .getOtherList('RC_PROJECT', 0, 9999)
      .subscribe((response: any) => {
        this.projects = response.data;
      });

    this.commonService
      .getOtherList('PRO_LANGUA', 0, 9999)
      .subscribe((response: any) => {
        this.skills = response.data;
      });

    this.auth.userSubject.subscribe((data) => {
      if (data != null) {
        this.user = data;
        if (data.rule != 1) {
          this.requestForm.controls['dep'].setValue(data.departmentName);
          this.departmentID = data.departmentId;

          this.renderPosition(this.departmentID);
        }
      }
    });
    this.extendFromParent();
  }
  get deadline() {
    return this.requestForm.controls['deadline'];
  }
  onSubmit(status: number) {
    (document?.querySelector('.overlay') as HTMLElement).style.display =
      'block';
    this.isLoaded = false;
    let request = {
      id: 0,
      name: this.requestForm.controls['name'].value,
      code: this.requestForm.controls['requestCode'].value,
      requestLevel: this.requestForm.controls['type'].value,
      orgnizationId: this.departmentID,
      positionID: this.requestForm.controls['position'].value,
      number: this.requestForm.controls['quantity'].value,
      signId: this.managerID,
      effectDate: this.today,
      expireDate: this.requestForm.controls['deadline'].value,
      yearExperience:
        this.requestForm.controls['experience'].value == ''
          ? 0
          : this.requestForm.controls['experience'].value,
      level:
        this.requestForm.controls['level'].value == ''
          ? 0
          : this.requestForm.controls['level'].value,
      type: this.requestForm.controls['type'].value,
      project: this.requestForm.controls['projects'].value,
      budget: 0,
      note: this.requestForm.controls['notes'].value,
      comment: '',
      status: status,
      parentID: this.requestService.selectedRequest.id,
      rank: 0,
      createBy: 'HUNGNX',
      createDate: this.today,
      updateBy: 'HUNGNX',
      updateDate: this.today,
      otherSkill:
        this.requestForm.controls['skill'].value == ''
          ? 0
          : this.requestForm.controls['skill'].value,
    };

    this.requestService
      .checkTotal(
        this.requestService.selectedRequest.id,
        this.requestForm.controls['quantity'].value
      )
      .subscribe((response: any) => {
        if (response.status == false) {
          this.isLoaded = true;
          Swal.fire(
            'Total quantity must be less than quantity of request parent'
          );
          (document?.querySelector('.overlay') as HTMLElement).style.display =
            'none';
        } else {
          this.requestService.insertRequest(request).subscribe(
            (response: any) => {
              if (response.status == true) {
                this.isLoaded = true;
                this.commonService.popUpSuccess();

                (
                  document?.querySelector('.overlay') as HTMLElement
                ).style.display = 'none';
                this.router.navigateByUrl(
                  '/yeucautuyendung/xemyeucau?index=1&size=20'
                );
              } else {
                this.isLoaded = true;

                (
                  document?.querySelector('.overlay') as HTMLElement
                ).style.display = 'none';
                this.commonService.popUpFailed('Failed');
              }
            },
            (err) => {
              this.isLoaded = true;
              (
                document?.querySelector('.overlay') as HTMLElement
              ).style.display = 'none';
              this.commonService.popUpFailed('Failed');
            }
          );
        }
      });
  }
  showPopUp() {
    this.orgPicker.fire();
  }
  getDataFromPopup(department: any) {
    this.requestForm.controls['dep']?.setValue(department.name);
    this.orgPicker.close();
    this.renderPosition(department.id);
    this.resetPositionField();
  }
  renderPosition(id: number) {
    this.orgService.getPositionByOrgID(id).subscribe(
      (response: any) => {
        this.listPosition = response.data;
        this.departmentID = id;
        this.orgService.getOrgByID(id).subscribe((response: any) => {
          this.requestForm.controls['office'].setValue(response.data.office);
          this.managerID = response.data.managerID;
        });
      },
      (err) => {
        Swal.fire('Position for this department is not available ');
        this.requestForm.controls['dep']?.reset();
        this.requestForm.controls['dep']?.setValue('');
        this.requestForm.controls['office']?.reset();
      }
    );
  }

  resetPositionField() {
    this.requestForm.controls['position']?.reset();
  }
  clearInputField() {
    if (this.requestService.selectedRequest.id != 0) {
    }
  }
  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control?.value) {
      const today = new Date();
      const dateToCheck = new Date(control.value);
      if (dateToCheck <= today) {
        return { invalid: true };
      }
    }
    return null;
  }

  extendFromParent() {
    let parentRequest = this.requestService.selectedRequest;

    console.log(this.requestService.selectedRequest);
    if (parentRequest.id > 0) {
      this.isChild = true;
      // this.requestForm.controls['dep'].setValue(parentRequest.orgnizationName);
      // this.departmentID = parentRequest.orgnizationID;
      this.requestForm.controls['projects'].setValue(parentRequest.projectID);
      this.requestForm.controls['projects'].disable();
      // this.renderPosition(this.departmentID);
      // this.orgService
      //   .getOrgByID(this.departmentID)
      //   .subscribe((response: any) => {
      //     this.requestForm.controls['office'].setValue(response.data.office);
      //     this.managerID = response.data.managerID;
      //     // this.requestForm.controls['dep'].disable();
      //
      //   });
    }
  }
}
