import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { ProfileService } from 'src/app/services/profile-service/profile.service';
@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.scss']
})
export class DistrictListComponent implements OnInit {
  disable = true;
  idSelected: any;
  DistrictForm!: FormGroup;
  action = 'Viewing';
  ProvinceList: any;
  DistrictList: any;
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
    this.DistrictForm = this.fb.group({
      name: [{ value: '', disabled: true }, [Validators.required]],
      nation: [{ value: '', disabled: true }, [Validators.required]],
      province: [{ value: '', disabled: true }, [Validators.required]],
      code: [{ value: '', disabled: true }],
      note: [{ value: '', disabled: true }]
    });

    this.profileService.getNationList().subscribe((res: any) => {
      this.NationList = res.data;
    });

    this.organizationService.getAllDistrict(this.page - 1, this.itemsPerPage).subscribe((response: any) => {
      this.totalItems = response.totalItem
      this.DistrictList = response.data
      console.log(this.totalItems)
    })
  }


  renderProvince(change: any) {
    this.ProvinceList = [];
    let nationId = this.DistrictForm.controls['nation'].value
    this.profileService.getProvinceByNationId(nationId).subscribe(
      (response: any) => {
        this.ProvinceList = response.data;
      },
      (err) => { }
    );
  }

  resetValue() {
    this.DistrictForm.controls['name'].setValue('');
    this.DistrictForm.controls['note'].setValue('');
    this.DistrictForm.controls['code'].setValue('');
    this.DistrictForm.controls['nation'].setValue('');
    this.DistrictForm.controls['province'].setValue('');
  }

  enableAllControl() {
    this.DistrictForm.controls['name'].enable();
    this.DistrictForm.controls['note'].enable();
    this.DistrictForm.controls['nation'].enable();
    this.DistrictForm.controls['province'].enable();
  }
  disableControl() {
    this.DistrictForm.controls['name'].disable();
    this.DistrictForm.controls['note'].disable();
    this.DistrictForm.controls['nation'].disable();
    this.DistrictForm.controls['province'].disable();
  }
  resetSelectedList() {
    this.listSelected = [];
  }
  innitCode() {
    this.commonService
      .autoGencode3Char('District', 'QH')
      .subscribe((res: any) => {
        this.DistrictForm.controls['code'].setValue(res);
      });

  }
  addNewDistrict() {
    this.resetValue();
    this.enableAllControl();
    this.disable = false;
    this.action = 'Add new';
    this.selectedIndexInTable = null;
    this.innitCode();
  }


  exportExcel() {
    this.commonService.exportExcel(this.DistrictList, "District");
  }
  deleteDistrict() {
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
          this.profileService.deleteDistrict(this.listSelected).subscribe(
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
      .getAllDistrict(pageIndex, this.itemsPerPage)
      .subscribe((res: any) => {
        this.DistrictList = res.data;
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
    this.DistrictForm.controls['name'].setValue(item.name);
    this.DistrictForm.controls['note'].setValue(item.note);
    this.DistrictForm.controls['code'].setValue(item.code);
    this.DistrictForm.controls['nation'].setValue(item.nationID);
    this.renderProvince(item.nationID);
    this.DistrictForm.controls['province'].setValue(item.provinceID);
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
    this.DistrictList = null;
    this.router.navigateByUrl(`/phanloaitochuc/danhmucdiadiem/districts?index=${page}&size=${this.itemsPerPage}`);
    this.resetValue();
    this.selectedIndexInTable = null;
    this.loadData(page - 1);
  }

  onSubmit() {
    let obj = {
      id: 0,
      code: this.DistrictForm.controls['code'].value,
      name: this.DistrictForm.controls['name'].value,
      note: this.DistrictForm.controls['note'].value,
      provinceId: this.DistrictForm.controls['province'].value,
      status: -1
    };
    if (this.action == 'Add new') {
      this.profileService.insertDistrict(obj).subscribe(
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
        code: this.DistrictForm.controls['code'].value,
        name: this.DistrictForm.controls['name'].value,
        note: this.DistrictForm.controls['note'].value,
        provinceId: this.DistrictForm.controls['province'].value,
      };
      this.profileService.modifyDistrict(obj).subscribe(
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
