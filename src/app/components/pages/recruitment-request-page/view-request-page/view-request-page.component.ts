import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request-service/request.service';
import { AuthorizeService } from 'src/app/services/authorize.service';

@Component({
  selector: 'app-view-request-page',
  templateUrl: './view-request-page.component.html',
  styleUrls: ['./view-request-page.component.scss'],
})
export class ViewRequestPageComponent implements OnInit,OnDestroy {
  route={name:'View all request',link:'/yeucautuyendung'}

  user:any
  constructor(private reqService:RequestService,private auth:AuthorizeService) {}
  ngOnDestroy(): void {
    this.reqService.listSelectedRequest=[]
  }

  ngOnInit(): void {
    this.auth.userSubject.subscribe(user=>{
      this.user=user
    })
  }
  deleteRQ(){
    console.log(this.reqService.listSelectedRequest)
  }
}
