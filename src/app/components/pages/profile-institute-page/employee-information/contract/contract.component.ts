import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile-service/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
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
  empId = 0;
  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.empId = this.activatedRoute.snapshot.queryParams["id"];
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
          size: this.itemsPerPage,
          employeeId: this.empId

        }
        if (this.FilterForm.controls['effectdate'].value == '') {
          obj.effectDate = "1000-07-26T04:51:14.030Z";
        }
        if (this.FilterForm.controls['exdate'].value == '') {
          obj.expireDate = "1000-07-26T04:51:14.030Z";
        }
        this.clearData();
        this.profileService
          .GetContractEmployeeByFilter2(obj)
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
  chooseItem(item: any, i: number) {
    this.selectedIndexInTable = i;
    this.disable = false;
    this.idSelected = item.id;

  }
  exportExcel() {
    this.commonService.exportExcel(this.contractEmpList, "Contract_Employeee");
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
      index: 0,
      size: 9999,
      employeeId: this.empId
    }
    obj.effectDate = "1000-07-26T04:51:14.030Z";

    obj.expireDate = "1000-07-26T04:51:14.030Z";
    
    this.clearData();
    this.profileService
      .GetContractEmployeeByFilter2(obj)
      .subscribe(
        (response: any) => {
          this.contractEmpList = response.data;
          this.totalItems = response.totalItem;
        },
        (err) => {
        }
      );
  }

}
