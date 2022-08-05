import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-position-in-org',
  templateUrl: './position-in-org.component.html',
  styleUrls: ['./position-in-org.component.scss'],
})
export class PositionInOrgComponent implements OnInit {
  @ViewChild('orgPicker') orgPicker!: SwalComponent;
  disable = true;
  idSelected: any;
  route = { name: 'Position categories', link: '/thietlaptochuc' };
  positionOrgForm!: FormGroup;
  action = 'Viewing';
  positionList: any;
  positionOrgList: any;
  listSelected!: Array<number>;
  selectedIndex = 0;
  itemsPerPage = 20;
  totalItems!: number;
  page: number = 1;
  selectedIndexInTable: any;
  departmentID!: number;

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    public readonly swalTargets: SwalPortalTargets,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.page = this.activatedRoute.snapshot.queryParams['index'];
    this.itemsPerPage = this.activatedRoute.snapshot.queryParams['size'];
    this.listSelected = [];
    this.positionOrgForm = this.fb.group({
      note: [{ value: '', disabled: true }],
      positions: [{ value: '', disabled: true }, [Validators.required]],
      dep: [{ value: '', disabled: true }, [Validators.required]],
    });

    this.organizationService
      .getAllPositionOrg(this.page - 1, this.itemsPerPage)
      .subscribe((response: any) => {
        this.positionOrgList = response.data;
        this.totalItems = response.totalItem;
      });
    this.organizationService.getAllPosition(0, 9999).subscribe((res: any) => {
      this.positionList = res.data;
    });
  }

  updateAllComplete($event: any, id: number) {
    if ((event?.target as any).checked) {
      this.listSelected.push(id);
    } else {
      let index = this.listSelected.findIndex((idObject) => idObject == id);
      this.listSelected.splice(index, 1);
    }
    console.log(this.listSelected);
  }

  gty(page: number) {
    this.router.navigateByUrl(
      `/thietlaptochuc/vitricongviec?index=${page}&size=${this.itemsPerPage}`
    );
    this.resetValue();
    this.selectedIndexInTable = null;
    this.loadData(page - 1);
  }
  loadData(pageIndex: number) {
    this.organizationService
      .getAllPositionOrg(pageIndex, this.itemsPerPage)
      .subscribe((res: any) => {
        this.positionOrgList = res.data;
        this.totalItems = res.totalItem;
      });
  }
  addNewPositionOrg() {
    this.resetValue();
    this.enableAllControl();
    this.disable = false;
    this.action = 'Add new';
    this.selectedIndexInTable = null;
  }

  deletePositionOrg() {
    if (this.listSelected.length <= 0) {
      this.commonService.popUpMessage('Choose at least one record!!!');
    } else {
      Swal.fire({
        text: 'Are you sure to delete?',
        iconHtml:
          ' <img src="../../../assets/images/icons/ques.jpg" width="100px" alt="">',
        showCancelButton: true,
        confirmButtonColor: '#309EFC',
        cancelButtonColor: '#8B94B2',
        confirmButtonText: 'Confirm',
        width: '380px',
      }).then((result) => {
        if (result.isConfirmed) {
          this.organizationService
            .deletePositionOrg(this.listSelected)
            .subscribe(
              (res: any) => {
                if (res.status == true) {
                  this.loadData(this.page - 1);
                  this.resetValue();
                  this.commonService.popUpSuccess();
                  this.listSelected = [];
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
  resetValue() {
    this.positionOrgForm.controls['dep'].setValue('');
    this.positionOrgForm.controls['positions'].setValue('');
    this.positionOrgForm.controls['note'].setValue('');
    this.departmentID = 0;
  }

  enableAllControl() {
    // this.positionOrgForm.controls['dep'].enable();
    this.positionOrgForm.controls['positions'].enable();
    this.positionOrgForm.controls['note'].enable();
  }
  disableControl() {
    this.positionOrgForm.controls['dep'].disable();
    this.positionOrgForm.controls['positions'].disable();
    this.positionOrgForm.controls['note'].disable();
  }
  resetSelectedList() {
    this.listSelected = [];
  }
  chooseItem(item: any, i: number) {
    this.selectedIndexInTable = i;
    this.enableAllControl();
    this.action = 'Editting';
    this.disable = false;
    this.idSelected = item.id;
    this.departmentID = item.orgId;
    this.positionOrgForm.controls['note'].setValue(item.note);
    this.positionOrgForm.controls['positions'].setValue(item.positionId);
    this.positionOrgForm.controls['dep'].setValue(item.orgName);
  }

  showPopUp() {
    this.orgPicker.fire();
  }

  getDataFromPopup(department: any) {
    this.positionOrgForm.controls['dep']?.setValue(department.name);
    this.orgPicker.close();
    this.departmentID = department.id;
  }
  onSubmit() {
    let obj = {
      id: 0,
      OrgId: this.departmentID,
      PositionId: this.positionOrgForm.controls['positions'].value,
      note: this.positionOrgForm.controls['note'].value,
      status: -1,
    };
    if (this.action == 'Add new') {
      this.organizationService
        .checkPositionExist(
          this.departmentID,
          this.positionOrgForm.controls['positions'].value
        )
        .subscribe((res: any) => {
          if (res.status == true) {
            this.organizationService.insertPositionOrg(obj).subscribe(
              (res: any) => {
                if (res.status == true) {
                  this.loadData(this.page - 1);
                  this.resetValue();
                  this.disableControl();
                  this.commonService.popUpSuccess();
                } else {
                  this.commonService.popUpFailed('Failed');
                }
              },
              (err) => {
                this.commonService.popUpFailed('Failed');
              }
            );
          } else {
            this.commonService.popUpFailed('Position is exist in orgnization');
          }
        });
    }

    if (this.action == 'Editting') {
      let obj = {
        id: this.idSelected,
        OrgId: this.departmentID,
        PositionId: this.positionOrgForm.controls['positions'].value,
        note: this.positionOrgForm.controls['note'].value,
      };
      this.organizationService.modifyPositionOrg(obj).subscribe(
        (res: any) => {
          console.log(res);
          if (res.status == true) {
            this.loadData(this.page - 1);
            this.resetValue();
            this.disableControl();
            this.commonService.popUpSuccess();
          } else {
            this.commonService.popUpFailed('Failed');
          }
        },
        (err) => {
          this.commonService.popUpFailed('Failed');
        }
      );
    }
  }
}
