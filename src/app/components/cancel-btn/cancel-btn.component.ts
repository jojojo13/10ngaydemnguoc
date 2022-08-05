import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { RequestService } from 'src/app/services/request-service/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cancel-btn',
  templateUrl: './cancel-btn.component.html',
  styleUrls: ['./cancel-btn.component.scss'],
})
export class CancelBtnComponent implements OnInit {
  @Input('action') action: any;
  @Input('request') request: any;
  isLoaded=true
  constructor(
    private reqService: RequestService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {}
  editStatus() {
    console.log(this.request)
    if (this.request.statusID == 2) {
      Swal.fire({
        text: 'Are you sure to cancel?',
        iconHtml:
          ' <img src="../../../assets/images/icons/ques.jpg" width="100px" alt="">',
        showCancelButton: true,
        confirmButtonColor: '#309EFC',
        cancelButtonColor: '#8B94B2',
        confirmButtonText: 'Confirm',
        width: '380px',
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoaded=false;
          (document?.querySelector('.overlay') as HTMLElement).style.display =
          'block';
          this.reqService.cancelRequest([this.request.id]).subscribe(
            (response: any) => {
              if (response.status == true) {
                this.isLoaded=true;
                (document?.querySelector('.overlay') as HTMLElement).style.display =
                'none';
                this.commonService.dataChange.next(true);
                this.commonService.popUpSuccess();
                this.commonService.reloadCurrentRoute()
              } else {
                this.isLoaded=true;
                (document?.querySelector('.overlay') as HTMLElement).style.display =
                'none';
                this.commonService.popUpFailed('Something wrong');
              }
            },
            (err) => {
              this.isLoaded=true;
              (document?.querySelector('.overlay') as HTMLElement).style.display =
              'none';
              this.commonService.popUpFailed('Something wrong');
            }
          );
        }
      });
    } else {
      this.commonService.popUpFailed(
        'Only choose request has submitted status'
      );
    }
  }
}
