import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request-service/request.service';
import { AuthorizeService } from 'src/app/services/authorize.service';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-request-page',
  templateUrl: './view-request-page.component.html',
  styleUrls: ['./view-request-page.component.scss'],
})
export class ViewRequestPageComponent implements OnInit, OnDestroy {
  route = { name: 'View all request', link: '/yeucautuyendung' }

  user: any
  constructor(private reqService: RequestService
    , private auth: AuthorizeService,
    private commonService: CommonService) { }
  ngOnDestroy(): void {
    this.reqService.listSelectedRequest = []
  }

  ngOnInit(): void {
    this.auth.userSubject.subscribe(user => {
      this.user = user
    })
  }

  deleteRQ() {

    let check = this.reqService.listSelectedRequest.every((request: any) => {
      return request.statusID == 3 || request.statusID == 1
    })

    if (check == true) {


      if (this.reqService.listSelectedRequest.length <= 0) {
        this.commonService.popUpMessage('Choose at least one record!!!');
      } else {
        Swal.fire({
          text: 'Are you sure to delete candidate',
          iconHtml:
            ' <img src="../../../assets/images/icons/ques.jpg" width="100px" alt="">',
          showCancelButton: true,
          confirmButtonColor: '#309EFC',
          cancelButtonColor: '#8B94B2',
          confirmButtonText: 'Confirm',
          width: '380px',
        }).then((result) => {
          if (result.isConfirmed) {
            let newIDS = this.reqService.listSelectedRequest.map(
              (c: any) => c.id
            );
            this.reqService
              .deleteRequest(newIDS)
              .subscribe(
                (res: any) => {
                  if (res.status == true) {
                    this.commonService.popUpSuccess();
                    this.reqService.listSelectedRequest = [];
                    location.reload();
                  } else {
                    this.commonService.popUpFailed(
                      'Some records have been appplied'
                    );
                  }
                },
                (err) => {
                  this.commonService.popUpFailed(
                    'Some records have been appplied'
                  );
                }
              );
          }
        });
      }
    }
    else {
      this.commonService.popUpFailed(
        'Only records in draft state or cancel are allowed to be deleted!'
      );
    }
  }
}
