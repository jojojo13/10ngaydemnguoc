import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { CommonService } from 'src/app/services/common.service';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { RequestService } from 'src/app/services/request-service/request.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-request',
  templateUrl: './form-request.component.html',
  styleUrls: ['./form-request.component.scss'],
})
export class FormRequestComponent implements OnInit {
  @ViewChild('orgPicker') orgPicker!: SwalComponent;
  @Output('req') req = new EventEmitter<any>();
  requestForm!: FormGroup;
  types: any;
  projects: any;
  positions: any;
  levels: any;
  skills: any;
  today: string = new Date().toISOString().slice(0, 10);
  departmentID!: number;
  setDeadline: any;
  managerID!: number;
  request: any;
  isLoaded = false;
  constructor(
    private fb: FormBuilder,
    public requestService: RequestService,
    public readonly swalTargets: SwalPortalTargets,
    private orgService: OrganizationService,
    private commonService: CommonService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    (document?.querySelector('.overlay') as HTMLElement).style.display =
    'block';

    let id = this.route.snapshot.paramMap.get('id') as string;
    this.requestForm = this.fb.group({
      requestCode: [{ value: '', disabled: true }],
      name: ['', [Validators.required]],
      type: [''],
      dep: ['', [Validators.required]],
      projects: [''],
      position: ['', [Validators.required]],
      quantity: [
        '',
        [Validators.pattern('^[1-9][0-9]*$'), Validators.required],
      ],
      office: [{ value: '', disabled: true }],
      deadline: ['', [Validators.required]],
      experience: [''],
      level: [''],
      skill: [''],
      notes: [''],
    });
    this.requestService
      .getRequestByID(parseInt(id))
      .subscribe((respone: any) => {
        let rq = respone.data;
        this.isLoaded = true;
        this.request = rq;
        this.req.emit(rq);
        this.setDeadline = this.reformatDate(this.request.deadline);
        this.requestForm.controls['requestCode'].setValue(rq.code);
        this.requestForm.controls['name'].setValue(rq.name);
        this.requestForm.controls['type'].setValue(rq.typeID);
        this.requestForm.controls['dep'].setValue(rq.orgnizationName);
       
        this.requestForm.controls['projects'].setValue(rq.projectID);
        this.requestForm.controls['position'].setValue(rq.positionID);
        this.requestForm.controls['quantity'].setValue(rq.quantity);
        this.requestForm.controls['office'].setValue(rq.office);
        this.requestForm.controls['deadline'].setValue(this.setDeadline);
        this.requestForm.controls['experience'].setValue(rq.experience);
        this.requestForm.controls['level'].setValue(rq.level);
        this.requestForm.controls['skill'].setValue(rq.otherSkill);
        this.requestForm.controls['notes'].setValue(rq.note);
        this.departmentID = rq.orgnizationID;
        this.managerID = rq.signID;
        this.renderPosition(this.departmentID);
        this.disableALL();
       
      });
   

      (document?.querySelector('.overlay') as HTMLElement).style.display =
      'none';
    this.loadData();
  }
  onSubmit() {
    (document?.querySelector('.overlay') as HTMLElement).style.display =
      'block';
    this.isLoaded = true;
    let request = {
      id: this.request.id,
      name: this.requestForm.controls['name'].value,
      code: this.requestForm.controls['requestCode'].value,
      requestLevel: this.requestForm.controls['type'].value,
      orgnizationId: this.departmentID,
      positionID: this.requestForm.controls['position'].value,
      number: this.requestForm.controls['quantity'].value,
      signId: this.managerID,
      effectDate: '2022-06-23T08:45:38.630Z',
      expireDate: this.requestForm.controls['deadline'].value,
      yearExperience: this.requestForm.controls['experience'].value,
      level: this.requestForm.controls['level'].value,
      otherSkill: this.requestForm.controls['skill'].value,
      type: this.requestForm.controls['type'].value,
      project: this.requestForm.controls['projects'].value,
      budget: 0,
      note: this.requestForm.controls['notes'].value,
      comment: this.request.comment,
      status: this.request.statusID,
      parentID: this.request.parentId,
      rank: this.request.rank,
      createBy: 'HUNGNX',
      createDate: '2022-06-23T08:45:38.630Z',
      updateBy: 'HUNGNX',
      updateDate: '2022-06-23T08:45:38.630Z',
      hrInchange: 2,
    };
    console.log(request);
    Swal.fire({
      text: 'Are you sure to edit this request?',
      iconHtml:
        ' <img src="../../../assets/images/icons/ques.jpg" width="100px" alt="">',
      showCancelButton: true,
      confirmButtonColor: '#309EFC',
      cancelButtonColor: '#8B94B2',
      confirmButtonText: 'Confirm',
      width: '380px',
    }).then((result) => {

      this.requestService.checkTotal(this.requestService.selectedRequest.id, this.requestForm.controls['quantity'].value).subscribe(
        (response: any) => {
          if (response.status == false) {
            Swal.fire('Total quantity must be less than quantity of request parent');
            (document?.querySelector('.overlay') as HTMLElement).style.display =
              'none';
          }
          else {
            if (result.isConfirmed) {
              console.log('confirm');
              this.requestService.editRequest(request).subscribe(
                (response: any) => {
                  console.log('call api');
                  this.isLoaded = true;
                  if (response.status == true) {
                    (
                      document?.querySelector('.overlay') as HTMLElement
                    ).style.display = 'none';
                    this.commonService.popUpSuccess();
                    this.location.back();
                  } else {
                    (
                      document?.querySelector('.overlay') as HTMLElement
                    ).style.display = 'none';
                    this.commonService.popUpFailed('Something wrong');
                  }
                },
                (err: any) => {
                  (document?.querySelector('.overlay') as HTMLElement).style.display =
                    'none';
                  this.commonService.popUpFailed('Something wrong');
                  this.isLoaded = true;
                }
              );
            }
          }
        });
    });
  }
  loadData() {
    this.loadListOfLevel();
    this.loadListOfSkill();
    // this.loadListOfPosition();
    this.loadListOfProject();
    this.loadListOfType();
  }
  loadListOfType() {
    this.commonService
      .getOtherList('RC_TYPE', 0, 9999)
      .subscribe((response: any) => {
        this.types = response.data;
      });
  }
  loadListOfProject() {
    this.commonService
      .getOtherList('RC_PROJECT', 0, 9999)
      .subscribe((response: any) => {
        console.log(response )
        this.projects = response.data;
      });
  }
  loadListOfPosition() {
    this.orgService.getPositionByOrgID(2).subscribe(
      (response: any) => {
        this.positions = response.data;
      },
      (err) => {}
    );
  }
  loadListOfLevel() {
    this.commonService
      .getOtherList('RC_LEVEL', 0, 9999)
      .subscribe((response: any) => {
        this.levels = response.data;
      });
  }
  loadListOfSkill() {
    this.commonService
      .getOtherList('PRO_LANGUA', 0, 9999)
      .subscribe((response: any) => {
        this.skills = response.data;
      });
  }
  showPopUp() {
    if (
      this.request.statusID == 1 ||
      this.request.statusID == 3 ||
      this.request.statusID == 5
    ) {
      this.orgPicker.fire();
    }
  }
  getDataFromPopup(department: any) {
    this.requestForm.controls['dep']?.setValue(department.name);
    this.orgPicker.close();
    this.renderPosition(department.id);
    this.resetPositionField();
    this.departmentID = department.id;
    this.orgService.getOrgByID(department.id).subscribe((response: any) => {
      this.requestForm.controls['office'].setValue(response.data.office);
      this.managerID = response.data.managerID;
    });
    console.log(this.requestForm)
  }
  renderPosition(id: number) {
    this.orgService.getPositionByOrgID(id).subscribe(
      (response: any) => {
        this.positions = response.data;
      },
      (err) => {
        Swal.fire('Position for this department is not available ');
        this.requestForm.controls['dep']?.reset();
      }
    );
  }

  resetPositionField() {
    this.requestForm.controls['position']?.reset();
  }
  clearInputField() {
    if (this.request.id != 0) {
    }
  }
  reformatDate(dateStr: string) {
    return dateStr.slice(0, 10);
  }
  disableALL() {
    if (this.request.statusID == 2 || this.request.statusID == 4) {
      this.requestForm.disable();
      this.requestForm.controls['dep'].setErrors({ incorrect: true });
    }
  }
}
