import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request-service/request.service';

@Component({
  selector: 'app-add-btn',
  templateUrl: './add-btn.component.html',
  styleUrls: ['./add-btn.component.scss']
})
export class AddBtnComponent implements OnInit {

  constructor(private router:Router,private request:RequestService,private common:CommonService) { }

  ngOnInit(): void {
  }
  navigateToForm(){
    if(this.request.selectedRequestForCandidate.rank==3){
      this.common.popUpFailed('Only create request to the 3rd level')
    }else{
      this.router.navigateByUrl('yeucautuyendung/taoyeucau')

    }
  }

}
