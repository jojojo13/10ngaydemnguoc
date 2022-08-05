import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { ProfileService } from 'src/app/services/profile-service/profile.service';
@Component({
  selector: 'app-nation-list',
  templateUrl: './nation-list.component.html',
  styleUrls: ['./nation-list.component.scss']
})

export class NationListComponent implements OnInit {
  disable = true;
  idSelected: any;
  NationForm!: FormGroup;
  action = 'Viewing';
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
    this.NationForm = this.fb.group({
      name: [{ value: '', disabled: true }, [Validators.required]],
      code: [{ value: '', disabled: true }],
      note: [{ value: '', disabled: true }]
    });
    this.organizationService.getAllNation(this.page - 1, this.itemsPerPage).subscribe((response: any) => {
      this.totalItems = response.totalItem
      this.NationList = response.data
      console.log(this.totalItems)
    })
  }

  resetValue() {
    this.NationForm.controls['name'].setValue('');
    this.NationForm.controls['note'].setValue('');
    this.NationForm.controls['code'].setValue('');
  }

  enableAllControl() {
    this.NationForm.controls['name'].enable();
    this.NationForm.controls['note'].enable();
  }
  disableControl() {
    this.NationForm.controls['name'].disable();
    this.NationForm.controls['note'].disable();
  }
  resetSelectedList() {
    this.listSelected = [];
  }
  innitCode() {
    this.commonService
      .autoGencode3Char('Nation', 'QG')
      .subscribe((res: any) => {
        this.NationForm.controls['code'].setValue(res);
      });

  }
  addNewNation() {
    this.resetValue();
    this.enableAllControl();
    this.disable = false;
    this.action = 'Add new';
    this.selectedIndexInTable = null;
    this.innitCode();
  }


  exportExcel() {
    this.commonService.exportExcel(this.NationList, "Nation");
  }
  deleteNation() {
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
          this.profileService.deleteNation(this.listSelected).subscribe(
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
      .getAllNation(pageIndex, this.itemsPerPage)
      .subscribe((res: any) => {
        this.NationList = res.data;
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
    this.NationForm.controls['name'].setValue(item.name);
    this.NationForm.controls['note'].setValue(item.note);
    this.NationForm.controls['code'].setValue(item.code);
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
    this.NationList = null;
    this.router.navigateByUrl(`/phanloaitochuc/danhmucdiadiem/nations?index=${page}&size=${this.itemsPerPage}`);
    this.resetValue();
    this.selectedIndexInTable = null;
    this.loadData(page - 1);
  }

  onSubmit() {
    let obj = {
      id: 0,
      code: this.NationForm.controls['code'].value,
      name: this.NationForm.controls['name'].value,
      note: this.NationForm.controls['note'].value,
      status: -1
    };
    if (this.action == 'Add new') {
      this.profileService.insertNation(obj).subscribe(
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
        code: this.NationForm.controls['code'].value,
        name: this.NationForm.controls['name'].value,
        note: this.NationForm.controls['note'].value
      };
      this.profileService.modifyNation(obj).subscribe(
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
