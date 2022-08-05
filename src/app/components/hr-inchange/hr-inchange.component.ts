import { CommonService } from 'src/app/services/common.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { AuthorizeService } from 'src/app/services/authorize.service';
import { RequestService } from 'src/app/services/request-service/request.service';

@Component({
  selector: 'app-hr-inchange',
  templateUrl: './hr-inchange.component.html',
  styleUrls: ['./hr-inchange.component.scss'],
})
export class HrInchangeComponent implements OnInit {
  @ViewChild('orgPicker') orgPicker!: SwalComponent;
  @Input('req') req:any
  isLoaded = true;
  emp: any;
  user:any
  constructor(
    private commonService: CommonService,
    public auth: AuthorizeService,
    public readonly swalTargets: SwalPortalTargets,
    private requestService: RequestService,
    private activatedRoute: ActivatedRoute
  ) {}
  department: any;
  ngOnInit(): void {
    this.auth.userSubject.subscribe((user) => {
      this.user = user;
    });
  }
  showPopUp() {
    this.orgPicker.fire();
  }
  getDataFromPopup(department: any) {
    this.department = department;
  }
  getEmp(emp: any) {
    this.emp = emp;
  }
  setHrInChg() {
    this.isLoaded = false;
    (document?.querySelector('.overlay') as HTMLElement).style.display =
      'block';

    let id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.requestService.setHRID(parseInt(id), this.emp.id).subscribe(
      (respone: any) => {
        (document?.querySelector('.overlay') as HTMLElement).style.display =
          'none';
        this.isLoaded = true;
        if (respone.status == true) {
          this.commonService.popUpSuccess();
          this.commonService.reloadCurrentRoute()
        } else {
          this.commonService.popUpFailed('Failed');
        }
      },
      (err) => {
        (document?.querySelector('.overlay') as HTMLElement).style.display =
          'none';
        this.isLoaded = true;
        this.commonService.popUpFailed('Failed');
      }
    );
  }
}
