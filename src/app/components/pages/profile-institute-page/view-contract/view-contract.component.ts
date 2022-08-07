import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { ProfileService } from 'src/app/services/profile-service/profile.service';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-view-contract',
  templateUrl: './view-contract.component.html',
  styleUrls: ['./view-contract.component.scss']
})
export class ViewContractComponent implements OnInit {

  disable = true;
  idSelected: any;
  route = { name: 'Profile institute', link: 'thietlaphoso' };
  contractForm!: FormGroup;
  listSelected!: Array<number>;
  selectedIndex = 0;
  itemsPerPage = 20;
  totalItems!: number;
  page: number = 1;
  selectedIndexInTable: any;
  contractList: any;
  tableData: any = [];


  @ViewChild('orgPicker') orgPicker!: SwalComponent;
  constructor(private fb: FormBuilder, private ProfileService: ProfileService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public readonly swalTargets: SwalPortalTargets,  ) { }

  ngOnInit(): void {
    this.page = this.activatedRoute.snapshot.queryParams["index"];
    this.itemsPerPage = this.activatedRoute.snapshot.queryParams["size"];
    this.listSelected = []
    this.ProfileService.getAllContractType(this.page - 1, this.itemsPerPage).subscribe((response: any) => {
      this.contractList = response.data
      this.totalItems = response.totalItem
    })
  }

  addNewContract() {

  }
  renderData(index: number, categoryID: number) {
    this.page = 1;
    this.resetSelectedList();
    this.selectedIndex = index;
    this.selectedIndexInTable = null;
    this.loadData(this.page - 1);
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
    this.commonService.exportExcel(this.contractList, "ContractEmployee");
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