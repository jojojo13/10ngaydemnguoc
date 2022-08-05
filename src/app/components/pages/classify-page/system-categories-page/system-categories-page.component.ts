import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';

@Component({
  selector: 'app-system-categories-page',
  templateUrl: './system-categories-page.component.html',
  styleUrls: ['./system-categories-page.component.scss'],
})
export class SystemCategoriesPageComponent implements OnInit {
  disable = true;
  idSelected: any;
  route = { name: 'System categories', link: '/phanloaitochuc' };
  categoryForm!: FormGroup;
  action = 'Viewing';
  categories: any;
  listItemInCategory: any;
  listSelected!: Array<number>;
  selectedIndex = 0;
  typeID = 8;
  code = 'RC_PROJECT';
  itemsPerPage = 20;
  totalItems!: number;
  page: number = 1;
  selectedIndexInTable: any;
  tableData: any = [];
  languageList: any;
  checkIsLanguage =0;

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.page = this.activatedRoute.snapshot.queryParams["index"];
    this.itemsPerPage = this.activatedRoute.snapshot.queryParams["size"];
    this.listSelected = [];
    this.categoryForm = this.fb.group({
      name: [{ value: '', disabled: true }, [Validators.required]],
      code: [{ value: '', disabled: true }],
      note: [{ value: '', disabled: true }],
      languages: [{ value: '', disabled: false }],
    });

    this.organizationService.getOtherListType(3).subscribe((res: any) => {
      this.categories = res.data;
      
    });
    this.commonService
      .getAllOtherList('RC_PROJECT', 0, 9999)
      .subscribe((res: any) => {
        this.listItemInCategory = res.data;
        this.totalItems=res.totalItem
      });

    this.commonService
      .getAllOtherList('LANGUAGE', 0, 9999)
      .subscribe((res: any) => {
        this.languageList = res.data;
      });
  }
  addNewCategory() {
    this.resetValue();
    this.enableAllControl();
    this.disable = false;
    this.action = 'Add new';
    this.selectedIndexInTable = null;
    this.innitCode();
  }
  innitCode() {
    this.commonService
      .autoGencode3Char('Other_List', 'OT')
      .subscribe((res: any) => {
        this.categoryForm.controls['code'].setValue(res);
      });
  }
  enableAllControl() {
    this.categoryForm.controls['name'].enable();
    this.categoryForm.controls['note'].enable();
  }

  disableControl() {
    this.categoryForm.controls['name'].disable();
    this.categoryForm.controls['note'].disable();
  }

  onSubmit() {
    let atribute;
    if (this.checkIsLanguage === -1) {
      atribute = this.categoryForm.controls['languages'].value.toString();
    }
    else {
      atribute = "";
    }
    let obj = {
      id: 0,
      code: this.categoryForm.controls['code'].value,
      name: this.categoryForm.controls['name'].value,
      note: this.categoryForm.controls['note'].value,
      atribute1: atribute,
      atribute2: 'string',
      atribute3: 'string',
      typeID: this.typeID,
    };
    if (this.action == 'Add new') {
      this.commonService.insertOtherList(obj).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loadData(this.code, this.page - 1);
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
        code: this.categoryForm.controls['code'].value,
        name: this.categoryForm.controls['name'].value,
        note: this.categoryForm.controls['note'].value,
        atribute1: atribute,
        atribute2: 'string',
        atribute3: 'string',
        typeID: this.typeID,
      };
      this.commonService.editOtherList(obj).subscribe(
        (res: any) => {
          console.log(res);
          if (res.status == true) {
            this.loadData(this.code, this.page - 1);
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
  renderData(code: string, index: number, categoryID: number) {
    this.page = 1;
    this.resetValue();
    this.resetSelectedList();
    this.code = code;
    this.selectedIndex = index;
    this.typeID = categoryID;
    this.selectedIndexInTable = null;
    this.loadData(code, this.page - 1);
    this.disableControl();
    if (code === "SKILL_LANG") {
      this.checkIsLanguage = -1;
    }
    else {
      this.checkIsLanguage = 0;
    }
  }
  loadData(code: string, pageIndex: number) {
    this.commonService
      .getAllOtherList(code, pageIndex, this.itemsPerPage)
      .subscribe((res: any) => {
        this.listItemInCategory = res.data;
        this.totalItems = res.totalItem;
      });
  }
  chooseItem(item: any, i: number) {
    this.selectedIndexInTable = i;
    this.enableAllControl();
    this.action = 'Editting';
    this.disable = false;
    this.idSelected = item.id;
    this.categoryForm.controls['name'].setValue(item.name);
    this.categoryForm.controls['note'].setValue(item.note);
    this.categoryForm.controls['code'].setValue(item.code);

    if (this.checkIsLanguage === -1) {
      this.categoryForm.controls['languages'].setValue(parseInt(item.attribute1));
    }
  }

  resetValue() {
    this.categoryForm.controls['name'].setValue('');
    this.categoryForm.controls['note'].setValue('');
    this.categoryForm.controls['code'].setValue('');
    this.categoryForm.controls['languages'].setValue('');
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
    this.router.navigateByUrl(`/phanloaitochuc/thamsohethong?index=${page }&size=${this.itemsPerPage}`);
    this.resetValue();
    this.selectedIndexInTable = null;
    this.loadData(this.code, page - 1);
  }

  exportExcel() {
    this.commonService.exportExcel(this.listItemInCategory, "SystemCategories");
  }
  deleteCategory() {
    if (this.listSelected.length <= 0) {
      this.commonService.popUpMessage('Choose at least one record!!!');
    } else {
      this.commonService.deleteOtherList(this.listSelected).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loadData(this.code, this.page - 1);
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
  }

  activeCategory() {
    if (this.listSelected.length <= 0) {
      this.commonService.popUpMessage('Choose at least one record!!!');
    } else {
      this.commonService.activeOtherList(this.listSelected).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loadData(this.code, this.page - 1);
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
  }

  deactiveCategory() {
    if (this.listSelected.length <= 0) {
      this.commonService.popUpMessage('Choose at least one record!!!');
    } else {
      this.commonService.deactiveOtherList(this.listSelected).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loadData(this.code, this.page - 1);
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
  }

}
