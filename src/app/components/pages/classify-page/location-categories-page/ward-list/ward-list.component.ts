import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { ProfileService } from 'src/app/services/profile-service/profile.service';
@Component({
  selector: 'app-ward-list',
  templateUrl: './ward-list.component.html',
  styleUrls: ['./ward-list.component.scss']
})
export class WardListComponent implements OnInit {
  disable = true;
  idSelected: any;
  WardForm!: FormGroup;
  action = 'Viewing';
  ProvinceList: any;
  WardList: any;
  NationList: any;
  DistrictList: any;
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
    this.WardForm = this.fb.group({
      name: [{ value: '', disabled: true }, [Validators.required]],
      nation: [{ value: '', disabled: true }, [Validators.required]],
      province: [{ value: '', disabled: true }, [Validators.required]],
      district: [{ value: '', disabled: true }, [Validators.required]],
      code: [{ value: '', disabled: true }],
      note: [{ value: '', disabled: true }]
    });

    this.profileService.getNationList().subscribe((res: any) => {
      this.NationList = res.data;
    });

    this.organizationService.getAllWard(this.page - 1, this.itemsPerPage).subscribe((response: any) => {
      this.totalItems = response.totalItem
      this.WardList = response.data
      console.log(this.totalItems)
    })
  }


  renderProvince(change: any) {
    this.ProvinceList = [];
    let nationId = this.WardForm.controls['nation'].value
    this.profileService.getProvinceByNationId(nationId).subscribe(
      (response: any) => {
        this.ProvinceList = response.data;
      },
      (err) => { }
    );
  }

  renderDistrict(change: any) {
    this.DistrictList = [];
    let provinceId = this.WardForm.controls['province'].value
    this.profileService.getDistrictByProvinceId(provinceId).subscribe(
      (response: any) => {
        this.DistrictList = response.data;
      },
      (err) => { }
    );
  }

  resetValue() {
    this.WardForm.controls['name'].setValue('');
    this.WardForm.controls['note'].setValue('');
    this.WardForm.controls['code'].setValue('');
    this.WardForm.controls['nation'].setValue('');
    this.WardForm.controls['province'].setValue('');
    this.WardForm.controls['district'].setValue('');
  }

  enableAllControl() {
    this.WardForm.controls['name'].enable();
    this.WardForm.controls['note'].enable();
    this.WardForm.controls['nation'].enable();
    this.WardForm.controls['province'].enable();
    this.WardForm.controls['district'].enable();
  }
  disableControl() {
    this.WardForm.controls['name'].disable();
    this.WardForm.controls['note'].disable();
    this.WardForm.controls['nation'].disable();
    this.WardForm.controls['province'].disable();
    this.WardForm.controls['district'].disable();
  }
  resetSelectedList() {
    this.listSelected = [];
  }
  innitCode() {
    this.commonService
      .autoGencode3Char('Ward', 'QH')
      .subscribe((res: any) => {
        this.WardForm.controls['code'].setValue(res);
      });

  }
  addNewWard() {
    this.resetValue();
    this.enableAllControl();
    this.disable = false;
    this.action = 'Add new';
    this.selectedIndexInTable = null;
    this.innitCode();
  }


  exportExcel() {
    this.commonService.exportExcel(this.WardList, "Ward");
  }
  deleteWard() {
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
          this.profileService.deleteWard(this.listSelected).subscribe(
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
      .getAllWard(pageIndex, this.itemsPerPage)
      .subscribe((res: any) => {
        this.WardList = res.data;
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
    this.WardForm.controls['name'].setValue(item.name);
    this.WardForm.controls['note'].setValue(item.note);
    this.WardForm.controls['code'].setValue(item.code);
    this.WardForm.controls['nation'].setValue(item.nationID);
    this.renderProvince(item.nationID);
    this.WardForm.controls['province'].setValue(item.provinceID);
    this.renderDistrict(item.provinceID);
    this.WardForm.controls['district'].setValue(item.districtID);
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
    this.WardList = null;
    this.router.navigateByUrl(`/phanloaitochuc/danhmucdiadiem/Wards?index=${page}&size=${this.itemsPerPage}`);
    this.resetValue();
    this.selectedIndexInTable = null;
    this.loadData(page - 1);
  }

  onSubmit() {
    let obj = {
      id: 0,
      code: this.WardForm.controls['code'].value,
      name: this.WardForm.controls['name'].value,
      note: this.WardForm.controls['note'].value,
      provinceId: this.WardForm.controls['province'].value,
      districtId: this.WardForm.controls['district'].value,
      status: -1
    };
    if (this.action == 'Add new') {
      this.profileService.insertWard(obj).subscribe(
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
        code: this.WardForm.controls['code'].value,
        name: this.WardForm.controls['name'].value,
        note: this.WardForm.controls['note'].value,
        provinceId: this.WardForm.controls['province'].value,
        districtId: this.WardForm.controls['district'].value,
      };
      this.profileService.modifyWard(obj).subscribe(
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
