import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProfileService } from 'src/app/services/profile-service/profile.service';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-contract-category-page',
  templateUrl: './contract-category-page.component.html',
  styleUrls: ['./contract-category-page.component.scss']
})
export class ContractCategoryPageComponent implements OnInit {

  disable = true;
  idSelected: any;
  route = { name: 'Contract categories', link: 'phanloaitochuc' };
  contractForm!: FormGroup;
  action = 'Viewing';
  categories: any;
  listSelected!: Array<number>;
  selectedIndex = 0;
  itemsPerPage = 20;
  totalItems!: number;
  page: number = 1;
  selectedIndexInTable: any;
  contractList: any;
  tableData: any = [];

  constructor(private fb: FormBuilder, private ProfileService: ProfileService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.page = this.activatedRoute.snapshot.queryParams["index"];
    this.itemsPerPage = this.activatedRoute.snapshot.queryParams["size"];
    this.contractForm = this.fb.group({
      name: [{ value: '', disabled: true }, [Validators.required]],
      code: [{ value: '', disabled: true }, [Validators.required]],
      note: [{ value: '', disabled: true }],
      term: [{ value: '', disabled: true }, [Validators.required]],
    });
    this.listSelected = []
    this.ProfileService.getAllContractType(this.page - 1, this.itemsPerPage).subscribe((response: any) => {
      this.contractList = response.data
      this.totalItems = response.totalItem
    })
  }

  addNewContract() {
    this.resetValue();
    this.enableAllControl();
    this.disable = false;
    this.action = 'Add new';
    this.selectedIndexInTable = null;
    this.innitCode();
  }
  innitCode() {
    this.commonService
      .autoGencode3Char('Contract_Type', 'LHD')
      .subscribe((res: any) => {
        this.contractForm.controls['code'].setValue(res);
      });
  }
  enableAllControl() {
    this.contractForm.controls['name'].enable();
    this.contractForm.controls['note'].enable();
    this.contractForm.controls['term'].enable();
  }
  disableControl() {
    this.contractForm.controls['name'].disable();
    this.contractForm.controls['note'].disable();
    this.contractForm.controls['term'].disable();
  }
  resetValue() {
    this.contractForm.controls['name'].setValue('');
    this.contractForm.controls['note'].setValue('');
    this.contractForm.controls['code'].setValue('');
    this.contractForm.controls['term'].setValue('');
  }
  onSubmit() {
    let obj = {
      id: 0,
      code: this.contractForm.controls['code'].value,
      name: this.contractForm.controls['name'].value,
      note: this.contractForm.controls['note'].value,
      term: this.contractForm.controls['term'].value,
      status: -1
    };
    if (this.action == 'Add new') {
      this.ProfileService.insertContractType(obj).subscribe(
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
        code: this.contractForm.controls['code'].value,
        name: this.contractForm.controls['name'].value,
        note: this.contractForm.controls['note'].value,
        term: this.contractForm.controls['term'].value,
      };
      this.ProfileService.modifyContractType(obj).subscribe(
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
    this.ProfileService
      .getAllContractType(pageIndex, this.itemsPerPage)
      .subscribe((res: any) => {
        this.contractList = res.data;
        this.totalItems = res.totalItem;
      });
  }
  chooseItem(item: any, i: number) {
    this.selectedIndexInTable = i;
    this.enableAllControl();
    this.action = 'Editting';
    this.disable = false;
    this.idSelected = item.id;
    this.contractForm.controls['name'].setValue(item.name);
    this.contractForm.controls['note'].setValue(item.note);
    this.contractForm.controls['code'].setValue(item.code);
  }


  resetSelectedList() {
    this.listSelected = [];
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
    this.router.navigateByUrl(`/phanloaitochuc/danhmuchucdanh?index=${page}&size=${this.itemsPerPage}`);
    this.resetValue();
    this.selectedIndexInTable = null;
    this.loadData(page - 1);
  }
  deleteContract() {
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
          this.ProfileService.deleteContractType(this.listSelected).subscribe(
            (res: any) => {
              if (res.status == true) {
                this.loadData(this.page - 1);
                this.commonService.popUpSuccess();
                this.listSelected = [];
                this.resetValue();
                this.disableControl();

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

  activeContract() {
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
          this.ProfileService.activeContractType(this.listSelected).subscribe(
            (res: any) => {
              if (res.status == true) {
                this.loadData(this.page - 1);
                this.commonService.popUpSuccess();
                this.listSelected = [];
                this.resetValue();
                this.disableControl();
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
  exportExcel() {
    this.commonService.exportExcel(this.contractList, "ContractType");
  }

  deactiveContract() {
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
          this.ProfileService.deactiveContractType(this.listSelected).subscribe(
            (res: any) => {
              if (res.status == true) {
                this.loadData(this.page - 1);
                this.commonService.popUpSuccess();
                this.listSelected = [];
                this.resetValue();
                this.disableControl();
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
}
