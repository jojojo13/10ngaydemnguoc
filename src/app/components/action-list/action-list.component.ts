import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizeService } from 'src/app/services/authorize.service';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.scss'],
})
export class ActionListComponent implements OnInit {
  @Input('request') request:any
  approveAction = { name: 'Approve request' };
  cancelAction = { name: 'Cancel request' };
  submitAction = { name: 'Submit request' };
  rejectAction = { name: 'Reject request' };
  user:any
  constructor(public auth: AuthorizeService) {}

   ngOnInit() {
    this.auth.userSubject.subscribe(user=>{
      this.user=user
    })
   
  }
}
