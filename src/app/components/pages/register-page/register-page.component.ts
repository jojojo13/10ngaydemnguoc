import { User } from '../../../models/User';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerForm:UntypedFormGroup
  user:User
  msg=''
  constructor(private fb:UntypedFormBuilder,private registerService:RegisterService) {
    this.registerForm=this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.email,Validators.required]],      avatar_url:['',Validators.required],
  
    })

    this.user=new User()
   }

  ngOnInit(): void {
   
  }
  register(){
    this.user=this.registerForm.value
    this.registerService.register(this.user).subscribe(data=>{
      console.log(data)
    },err=>{
      if(err.status==400){
        this.msg="Email is exsisted, pls use another email"
      }
      
    })
  }

}
