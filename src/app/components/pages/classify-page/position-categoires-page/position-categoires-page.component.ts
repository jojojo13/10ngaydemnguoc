import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';


@Component({
  selector: 'app-position-categoires-page',
  templateUrl: './position-categoires-page.component.html',
  styleUrls: ['./position-categoires-page.component.scss']
})
export class PositionCategoiresPageComponent implements OnInit {
  disable = true;
  idSelected: any;
  route = { name: 'Position categories', link: '/phanloaitochuc' };
  positionForm!: FormGroup;
  action = 'Viewing';
  titleList: any;
  workFormList: any;
  positionList: any;
  listSelected!: Array<number>;
  selectedIndex = 0;
  itemsPerPage = 20;
  totalItems!: number;
  page: number = 1;
  selectedIndexInTable: any;
  tableData: any = [];

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.page = this.activatedRoute.snapshot.queryParams["index"];
    this.itemsPerPage = this.activatedRoute.snapshot.queryParams["size"];
    this.listSelected = [];
    this.positionForm = this.fb.group({
      name: [{ value: '', disabled: true }, [Validators.required]],
      code: [{ value: '', disabled: true }],
      note: [{ value: '', disabled: true }],
      titles: [{ value: '', disabled: true }, [Validators.required]],
      basicSalary: [{ value: '', disabled: true },[Validators.required]],
      workForms: [{ value: '', disabled: true }],
      otherSkill: [{ value: '', disabled: true }]
    });
    this.organizationService.getAllofPosition(this.page - 1, this.itemsPerPage).subscribe((response: any) => {
      this.positionList = response.data
      this.totalItems = response.totalItem
    })
    this.organizationService.getAllTitle(0, 9999).subscribe((res: any) => {
      this.titleList = res.data;
    });
    this.commonService
      .getOtherList('WORK_FORM', 0, 9999)
      .subscribe((res: any) => {
        this.workFormList = res.data;
        this.totalItems = res.totalItem
      });
  }

  resetValue() {
    this.positionForm.controls['name'].setValue('');
    this.positionForm.controls['note'].setValue('');
    this.positionForm.controls['code'].setValue('');
    this.positionForm.controls['basicSalary'].setValue('');
    this.positionForm.controls['titles'].setValue(null);
    this.positionForm.controls['workForms'].setValue(null);
    this.positionForm.controls['otherSkill'].setValue('');
  }

  enableAllControl() {
    this.positionForm.controls['name'].enable();
    this.positionForm.controls['note'].enable();
    this.positionForm.controls['titles'].enable();
    this.positionForm.controls['basicSalary'].enable();
    this.positionForm.controls['workForms'].enable();
    this.positionForm.controls['otherSkill'].enable();
  }
  disableControl() {
    this.positionForm.controls['name'].disable();
    this.positionForm.controls['note'].disable();
    this.positionForm.controls['titles'].disable();
    this.positionForm.controls['basicSalary'].disable();
    this.positionForm.controls['workForms'].disable();
    this.positionForm.controls['otherSkill'].disable();
  }
  resetSelectedList() {
    this.listSelected = [];
  }
  innitCode() {
    this.commonService
      .autoGencode3Char('Position', 'VTCV')
      .subscribe((res: any) => {
        this.positionForm.controls['code'].setValue(res);
      });
  }
  addNewPosition() {
    this.resetValue();
    this.enableAllControl();
    this.disable = false;
    this.action = 'Add new';
    this.selectedIndexInTable = null;
    this.innitCode();
  }


  exportExcel() {
    this.commonService.exportExcel(this.positionList, "Position");
  }
  deletePosition() {
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
          this.organizationService.deletePosition(this.listSelected).subscribe(
            (res: any) => {
              if (res.status == true) {
                this.loadData(this.page - 1);
                this.commonService.popUpSuccess();
                this.listSelected = []
              } else {
                this.commonService.popUpFailed('Some records have been appplied');
              }
            },
            (err) => {
              this.commonService.popUpFailed('Some records have been appplied');
            }
          );
        }
      });
    }
  }

  activePosition() {
    if (this.listSelected.length <= 0) {
      this.commonService.popUpMessage('Choose at least one record!!!');
    }
    else {
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
          this.organizationService.activePosition(this.listSelected).subscribe(
            (res: any) => {
              if (res.status == true) {
                this.loadData(this.page - 1);
                this.commonService.popUpSuccess();
                this.listSelected = []
              } else {
                this.commonService.popUpFailed('Some records have been appplied');
              }
            },
            (err) => {
              this.commonService.popUpFailed('Some records have been appplied');
            }
          );
        }
      });
    }

  }
  deactivePosition() {
    if (this.listSelected.length <= 0) {
      this.commonService.popUpMessage('Choose at least one record!!!');
    }
    else {
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
          this.organizationService.deactivePosition(this.listSelected).subscribe(
            (res: any) => {
              if (res.status == true) {
                this.loadData(this.page - 1);
                this.commonService.popUpSuccess();
                this.listSelected = []
              } else {
                this.commonService.popUpFailed('Some records have been appplied');
              }
            },
            (err) => {
              this.commonService.popUpFailed('Some records have been appplied');
            }
          );
        }
      });
    }

  }
  renderData(index: number, categoryID: number) {
    this.page = 1;
    this.resetValue();
    this.resetSelectedList();
    this.selectedIndex = index;
    this.selectedIndexInTable = null;
    this.loadData(this.page - 1);
    this.disableControl();
  }


  loadData(pageIndex: number) {
    this.organizationService
      .getAllPosition(pageIndex, this.itemsPerPage)
      .subscribe((res: any) => {
        this.positionList = res.data;
        this.totalItems = res.totalItem;
      });
  }

  chooseItem(item: any, i: number) {
    this.selectedIndexInTable = i;
    this.enableAllControl();
    this.action = 'Editting';
    this.disable = false;
    this.idSelected = item.id;
    this.positionForm.controls['name'].setValue(item.name);
    this.positionForm.controls['note'].setValue(item.note);
    this.positionForm.controls['code'].setValue(item.code);
    this.positionForm.controls['basicSalary'].setValue(item.basicSalary);
    this.positionForm.controls['titles'].setValue(item.titleId);
    this.positionForm.controls['workForms'].setValue(item.workFormID);
    this.positionForm.controls['otherSkill'].setValue(item.otherSkill);
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
    this.router.navigateByUrl(`/phanloaitochuc/danhmucvitricongviec?index=${page}&size=${this.itemsPerPage}`);
    this.resetValue();
    this.selectedIndexInTable = null;
    this.loadData(page - 1);
  }

  onSubmit() {
    let workform = this.positionForm.controls['workForms'].value == '' ? 0 : this.positionForm.controls['workForms'].value
    let obj = {
      id: 0,
      code: this.positionForm.controls['code'].value,
      name: this.positionForm.controls['name'].value,
      note: this.positionForm.controls['note'].value,
      formWorking: workform,
      basicSalary: this.positionForm.controls['basicSalary'].value,
      otherSkill: this.positionForm.controls['otherSkill'].value,
      titleID: this.positionForm.controls['titles'].value,
      status: -1
    };
    if (this.action == 'Add new') {
      this.organizationService.insertPosition(obj).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loadData(this.page - 1);
            this.resetValue();
            this.disableControl();
            this.innitCode();
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

    if (this.action == 'Editting') {
      let obj = {
        id: this.idSelected,
        code: this.positionForm.controls['code'].value,
        name: this.positionForm.controls['name'].value,
        note: this.positionForm.controls['note'].value,
        formWorking: workform,
        basicSalary: this.positionForm.controls['basicSalary'].value,
        otherSkill: this.positionForm.controls['otherSkill'].value,
        titleID: this.positionForm.controls['titles'].value,
      };
      this.organizationService.modifyPosition(obj).subscribe(
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
