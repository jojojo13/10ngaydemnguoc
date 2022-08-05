import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { ProfileService } from 'src/app/services/profile-service/profile.service';
@Component({
  selector: 'app-province-list',
  templateUrl: './province-list.component.html',
  styleUrls: ['./province-list.component.scss']
})
export class ProvinceListComponent implements OnInit {
  disable = true;
  idSelected: any;
  ProvinceForm!: FormGroup;
  action = 'Viewing';
  ProvinceList: any;
  NationList: any;
  listSelected!: Array<number>;
  selectedIndex = 0;
  itemsPerPage = 15;
  totalItems!: number;
  page: number = 1;
  selectedIndexInTable: any;
  tableData: any = [];

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private profileService: ProfileService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.page = this.activatedRoute.snapshot.queryParams["index"];
    this.itemsPerPage = this.activatedRoute.snapshot.queryParams["size"];
    this.listSelected = [];
    this.ProvinceForm = this.fb.group({
      name: [{ value: '', disabled: true }, [Validators.required]],
      nation: [{ value: '', disabled: true }, [Validators.required]],
      code: [{ value: '', disabled: true }],
      note: [{ value: '', disabled: true }]
    });

    this.profileService.getNationList().subscribe((res: any) => {
      this.NationList = res.data;
    });

    this.organizationService.getAllProvince(this.page - 1, this.itemsPerPage).subscribe((response: any) => {
      this.totalItems = response.totalItem
      this.ProvinceList = response.data
      console.log(this.totalItems)
    })
  }

  resetValue() {
    this.ProvinceForm.controls['name'].setValue('');
    this.ProvinceForm.controls['note'].setValue('');
    this.ProvinceForm.controls['code'].setValue('');
    this.ProvinceForm.controls['nation'].setValue('');
  }

  enableAllControl() {
    this.ProvinceForm.controls['name'].enable();
    this.ProvinceForm.controls['note'].enable();
    this.ProvinceForm.controls['nation'].enable();
  }
  disableControl() {
    this.ProvinceForm.controls['name'].disable();
    this.ProvinceForm.controls['note'].disable();
    this.ProvinceForm.controls['nation'].disable();
  }
  resetSelectedList() {
    this.listSelected = [];
  }
  innitCode() {
    this.commonService
      .autoGencode3Char('Province', 'TT')
      .subscribe((res: any) => {
        this.ProvinceForm.controls['code'].setValue(res);
      });

  }
  addNewProvince() {
    this.resetValue();
    this.enableAllControl();
    this.disable = false;
    this.action = 'Add new';
    this.selectedIndexInTable = null;
    this.innitCode();
  }


  exportExcel() {
    this.commonService.exportExcel(this.ProvinceList, "Province");
  }
  deleteProvince() {
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
          this.profileService.deleteProvince(this.listSelected).subscribe(
            (res: any) => {
              if (res.status == true) {
                this.loadData(this.page - 1);
                this.commonService.popUpSuccess();
                this.listSelected = [];
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
      .getAllProvince(pageIndex, this.itemsPerPage)
      .subscribe((res: any) => {
        this.ProvinceList = res.data;
        this.totalItems = res.totalItem;
      });
    this.resetValue();
    this.disableControl();
  }

  chooseItem(item: any, i: number) {
    this.selectedIndexInTable = i;
    this.enableAllControl();
    this.action = 'Editting';
    this.disable = false;
    this.idSelected = item.id;
    this.ProvinceForm.controls['name'].setValue(item.name);
    this.ProvinceForm.controls['note'].setValue(item.note);
    this.ProvinceForm.controls['code'].setValue(item.code);
    this.ProvinceForm.controls['nation'].setValue(item.nationID);
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
    this.ProvinceList = null;
    this.router.navigateByUrl(`/phanloaitochuc/danhmucdiadiem/provinces?index=${page}&size=${this.itemsPerPage}`);
    this.resetValue();
    this.selectedIndexInTable = null;
    this.loadData(page - 1);
  }

  onSubmit() {
    let obj = {
      id: 0,
      code: this.ProvinceForm.controls['code'].value,
      name: this.ProvinceForm.controls['name'].value,
      note: this.ProvinceForm.controls['note'].value,
      nationId: this.ProvinceForm.controls['nation'].value,
      status: -1
    };
    if (this.action == 'Add new') {
      this.profileService.insertProvince(obj).subscribe(
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
        code: this.ProvinceForm.controls['code'].value,
        name: this.ProvinceForm.controls['name'].value,
        note: this.ProvinceForm.controls['note'].value,
        nationId: this.ProvinceForm.controls['nation'].value,
      };
      this.profileService.modifyProvince(obj).subscribe(
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

