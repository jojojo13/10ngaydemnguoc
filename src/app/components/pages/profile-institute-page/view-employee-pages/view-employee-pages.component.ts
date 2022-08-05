import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { debounceTime } from 'rxjs';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
@Component({
  selector: 'app-view-employee-pages',
  templateUrl: './view-employee-pages.component.html',
  styleUrls: ['./view-employee-pages.component.scss']
})
export class ViewEmployeePagesComponent implements OnInit {
  @ViewChild('orgPicker') orgPicker!: SwalComponent;
  route = { name: 'View employee', link: '/thietlaphoso' };
  itemsPerPage = 20;
  totalItems!: number;
  page: number = 1;
  isLoaded: boolean = false;
  listemployee: any;
  employeeForm!: FormGroup;
  popupForm!: FormGroup;
  departmentID: number = 1;
  constructor(
    private activatedRoute: ActivatedRoute,
    private orgService: OrganizationService,
    private router: Router,
    private fb: FormBuilder,
    public readonly swalTargets: SwalPortalTargets
  ) { }
  ngOnInit(): void {
    this.initForm();
    this.isLoaded = false;
    this.page = this.activatedRoute.snapshot.queryParams['index'];
    this.itemsPerPage = this.activatedRoute.snapshot.queryParams['size'];
    this.loadData(this.departmentID);
    this.popupForm.controls['dep'].setValue("Công ty Capstone Project");

  }
  loadData(orgId: number) {
    this.clearData();
    this.orgService
      .getEmployeeByOrgID(orgId, this.page - 1, this.itemsPerPage)
      .subscribe(
        (response: any) => {
          this.isLoaded = true;
          this.listemployee = response.data;
          this.totalItems = response.totalItem;

        },
        (err) => {
          this.isLoaded = true;
        }
      );
  }
  gty(page: number) {
    this.isLoaded = false;
    this.router.navigateByUrl(
      `/thietlaphoso/nhanvien?index=${page}&size=${this.itemsPerPage}`
    );
    this.clearData();
    this.loadData(this.departmentID);
  }
  clearData() {
    this.isLoaded = false
    this.listemployee = null;
  }

  showPopUp() {
    this.orgPicker.fire();
  }

  getDataFromPopup(department: any) {
    this.popupForm.controls['dep']?.setValue(department.name);
    this.orgPicker.close();
    this.departmentID = department.id;
    this.loadData(this.departmentID);
  }
  initForm() {
    this.popupForm = this.fb.group({
      dep: ['']
    });

    this.employeeForm = this.fb.group({
      code: [''],
      name: [''],
      orgName: [''],
      title: [''],
      position: [''],
      joinDate: [''],
      status: ['']
    });
    this.employeeForm.valueChanges
      .pipe(debounceTime(2000))
      .subscribe((selectedValue) => {
        let obj = {
          code: this.employeeForm.controls['code'].value,
          name: this.employeeForm.controls['name'].value,
          orgName: this.employeeForm.controls['orgName'].value,
          titleName: this.employeeForm.controls['title'].value,
          positionName: this.employeeForm.controls['position'].value,
          joinDate: this.employeeForm.controls['joinDate'].value,
          status: this.employeeForm.controls['status'].value,
          index: this.page-1,
          size: this.itemsPerPage,
          orgID: this.departmentID
        }

        if (this.employeeForm.controls['joinDate'].value != '') {
          obj.joinDate = this.employeeForm.controls['joinDate'].value;
        }
        if (this.employeeForm.controls['joinDate'].value == '') {
          obj.joinDate = "1000-07-26T04:51:14.030Z";
        }

        this.clearData();
        this.orgService
          .getEmployeeByOrgIDByFilter(obj)
          .subscribe(
            (response: any) => {
              this.isLoaded = true;
              this.listemployee = response.data;
              this.totalItems = response.totalItem;

            },
            (err) => {
              this.isLoaded = true;
            }
          );
      });
  }
  navigateToView(employee: any) {
    this.router.navigateByUrl(`/thietlaphoso/chitietnhanvien/info?id=${employee.id}`);
  }
}
