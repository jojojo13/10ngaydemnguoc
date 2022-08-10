import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile-service/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { debounceTime } from 'rxjs';


@Component({
  selector: 'app-view-contract',
  templateUrl: './view-contract.component.html',
  styleUrls: ['./view-contract.component.scss']
})
export class ViewContractComponent implements OnInit {

  disable = true;
  idSelected: any;
  route = { name: 'Profile institute', link: '/thietlaphoso' };
  positionForm!: FormGroup;

  contractEmpList: any;
  listSelected!: Array<number>;
  selectedIndex = 0;
  itemsPerPage = 20;
  totalItems!: number;
  page: number = 1;
  selectedIndexInTable: any;
  tableData: any = [];
  FilterForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {

    this.page = this.activatedRoute.snapshot.queryParams["index"];
    this.itemsPerPage = this.activatedRoute.snapshot.queryParams["size"];
    this.loadData(this.page - 1);
    this.initForm();
    this.listSelected = [];
  }


  initForm() {
    this.FilterForm = this.fb.group({
      name: [''],
      code: [''],
      orgName: [''],
      contractNo: [''],
      contractType: [''],
      position: [''],
      effectdate: [''],
      exdate: [''],
      status: ['']
    });
    this.FilterForm.valueChanges
      .pipe(debounceTime(2000))
      .subscribe((selectedValue) => {
        let obj = {
          code: this.FilterForm.controls['code'].value,
          name: this.FilterForm.controls['name'].value,
          orgnizationName: this.FilterForm.controls['orgName'].value,
          contractNo: this.FilterForm.controls['contractNo'].value,
          contractType: this.FilterForm.controls['contractType'].value,
          position: this.FilterForm.controls['position'].value,
          effectDate: this.FilterForm.controls['effectdate'].value,
          expireDate: this.FilterForm.controls['exdate'].value,
          status: this.FilterForm.controls['status'].value,
          index: this.page - 1,
          size: this.itemsPerPage
        }
        if (this.FilterForm.controls['effectdate'].value == '') {
          obj.effectDate = "1000-07-26T04:51:14.030Z";
        }
        if (this.FilterForm.controls['exdate'].value == '') {
          obj.expireDate = "1000-07-26T04:51:14.030Z";
        }
        this.clearData();
        this.profileService
          .GetContractEmployeeByFilter(obj)
          .subscribe(
            (response: any) => {
              this.contractEmpList = response.data;
              this.totalItems = response.totalItem;
            },
            (err) => {
            }
          );
      });
  }


  clearData() {
    this.contractEmpList = null;
  }

  resetSelectedList() {
    this.listSelected = [];
  }
  addNewContractEmp() {
    this.router.navigateByUrl('thietlaphoso/taohopdong?mode=New');
  }

  activeContractEmp() {
    if (this.listSelected.length <= 0) {
      this.commonService.popUpMessage('Choose at least one record!!!');
    } else {
      Swal.fire({
        text: 'Are you sure to active?',
        iconHtml:
          ' <img src="../../../assets/images/icons/ques.jpg" width="100px" alt="">',
        showCancelButton: true,
        confirmButtonColor: '#309EFC',
        cancelButtonColor: '#8B94B2',
        confirmButtonText: 'Confirm',
        width: '380px',
      }).then((result) => {
        if (result.isConfirmed) {
          this.profileService.activeContractEmp(this.listSelected).subscribe(
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
  deactiveContractEmp() {
    if (this.listSelected.length <= 0) {
      this.commonService.popUpMessage('Choose at least one record!!!');
    } else {
      Swal.fire({
        text: 'Are you sure to deactive?',
        iconHtml:
          ' <img src="../../../assets/images/icons/ques.jpg" width="100px" alt="">',
        showCancelButton: true,
        confirmButtonColor: '#309EFC',
        cancelButtonColor: '#8B94B2',
        confirmButtonText: 'Confirm',
        width: '380px',
      }).then((result) => {
        if (result.isConfirmed) {
          this.profileService.deactiveContractEmp(this.listSelected).subscribe(
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


  exportExcel() {
    this.commonService.exportExcel(this.contractEmpList, "Contract_Employeee");
  }


  deleteContractEmp() {
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
    this.resetSelectedList();
    this.selectedIndex = index;
    this.selectedIndexInTable = null;
    this.loadData(this.page - 1);
  }


  loadData(pageIndex: number) {
    let obj = {
      code: "",
      name: "",
      orgnizationName: "",
      contractNo: "",
      contractType: "",
      position: "",
      effectDate: '',
      expireDate: '',
      status: "",
      index: this.page - 1,
      size: this.itemsPerPage
    }
    obj.effectDate = "1000-07-26T04:51:14.030Z";

    obj.expireDate = "1000-07-26T04:51:14.030Z";

    this.clearData();
    this.profileService
      .GetContractEmployeeByFilter(obj)
      .subscribe(
        (response: any) => {
          this.contractEmpList = response.data;
          this.totalItems = response.totalItem;
        },
        (err) => {
        }
      );
  }

  chooseItem(item: any, i: number) {
    this.selectedIndexInTable = i;
    this.disable = false;
    this.idSelected = item.id;

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
    this.router.navigateByUrl(`/thietlaphoso/hopdong?index=${page}&size=${this.itemsPerPage}`);
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
  }

  navigateToView(item: any) {
    this.router.navigateByUrl(`/thietlaphoso/taohopdong?mode=Edit&id=${item.id}`);
  }
}
