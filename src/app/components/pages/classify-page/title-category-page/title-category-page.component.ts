import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { TitleService } from 'src/app/services/title-service/title.service';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-title-category-page',
  templateUrl: './title-category-page.component.html',
  styleUrls: ['./title-category-page.component.scss'],
})
export class TitleCategoryPageComponent implements OnInit {


  disable = true;
  idSelected: any;
  route = { name: 'Title categories', link: '/phanloaitochuc' };
  titleForm!: FormGroup;
  action = 'Viewing';
  categories: any;
  listSelected!: Array<number>;
  selectedIndex = 0;
  itemsPerPage = 20;
  totalItems!: number;
  page: number = 1;
  selectedIndexInTable: any;
  tableData: any = [];

  constructor(private fb: FormBuilder, private titleservice: TitleService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  titleList: any
  ngOnInit(): void {
    this.page = this.activatedRoute.snapshot.queryParams["index"];
    this.itemsPerPage = this.activatedRoute.snapshot.queryParams["size"];
    this.titleForm = this.fb.group({
      name: [{ value: '', disabled: true }],
      code: [{ value: '', disabled: true }],
      note: [{ value: '', disabled: true }],
    });
    this.listSelected = []
    this.titleservice.getAllTitle(this.page-1, this.itemsPerPage).subscribe((response: any) => {
      this.titleList = response.data
      this.totalItems=response.totalItem
    })
  }
  addNewTitle() {
    this.resetValue();
    this.enableAllControl();
    this.disable = false;
    this.action = 'Add new';
    this.selectedIndexInTable = null;
    this.innitCode();
  }
  innitCode() {
    this.commonService
      .autoGencode3Char('Title', 'CD')
      .subscribe((res: any) => {
        this.titleForm.controls['code'].setValue(res);
      });
  }
  enableAllControl() {
    this.titleForm.controls['name'].enable();
    this.titleForm.controls['note'].enable();
  }
  disableControl() {
    this.titleForm.controls['name'].disable();
    this.titleForm.controls['note'].disable();
  }
  resetValue() {
    this.titleForm.controls['name'].setValue('');
    this.titleForm.controls['note'].setValue('');
    this.titleForm.controls['code'].setValue('');
  }
  onSubmit() {
    let obj = {
      id: 0,
      code: this.titleForm.controls['code'].value,
      name: this.titleForm.controls['name'].value,
      note: this.titleForm.controls['note'].value,
      status: -1
    };
    if (this.action == 'Add new') {
      this.titleservice.insertTitle(obj).subscribe(
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
        code: this.titleForm.controls['code'].value,
        name: this.titleForm.controls['name'].value,
        note: this.titleForm.controls['note'].value,
      };
      this.titleservice.modifyTitle(obj).subscribe(
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
    this.titleservice
      .getAll(pageIndex, this.itemsPerPage)
      .subscribe((res: any) => {
        this.titleList = res.data;
        this.totalItems = res.totalItem;
      });
  }
  chooseItem(item: any, i: number) {
    this.selectedIndexInTable = i;
    this.enableAllControl();
    this.action = 'Editting';
    this.disable = false;
    this.idSelected = item.id;
    this.titleForm.controls['name'].setValue(item.name);
    this.titleForm.controls['note'].setValue(item.note);
    this.titleForm.controls['code'].setValue(item.code);
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

  exportExcel() {
    this.commonService.exportExcel(this.categories, "Title");
  }

  deleteTitle() {
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
          this.titleservice.deleteTitle(this.listSelected).subscribe(
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

  activeTitle() {
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
          this.titleservice.activeTitle(this.listSelected).subscribe(
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

  deactiveTitle() {
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
          this.titleservice.deactiveTitle(this.listSelected).subscribe(
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
