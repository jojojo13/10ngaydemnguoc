import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  constructor(private fb: FormBuilder, private common: CommonService) {}
  passwordForm!: FormGroup;
  isLoaded = true;
  isShow1=false;
  isShow2=false;
  isShow3=false;
  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      oldPass: ['', Validators.required],
      newPass: ['', [Validators.required]],
      confirmPass: ['', Validators.required],
    });
    this.passwordForm
      .get('confirmPass')
      ?.addValidators(this.checkPasswords.bind(this));
  }

  checkPasswords(control: AbstractControl): { [key: string]: boolean } | null {
    if (control?.value) {
      let pass = this.passwordForm.get('newPass')?.value;
      let confirmPass = control?.value;

      if (pass != confirmPass) {
        return { invalid: true };
      }
    }
    return null;
  }
  get cfp() {
    return this.passwordForm.controls['confirmPass'];
  }
  changePWD() {
    this.isLoaded = false;
    (document?.querySelector('.overlay') as HTMLElement).style.display =
      'block';
    let obj = {
      username: this.passwordForm.get('username')?.value,
      email: this.passwordForm.get('email')?.value,
      password: this.passwordForm.get('newPass')?.value,
    };
    this.common.changePass(obj).subscribe((res: any) => {
      if (res.status == true) {
        this.isLoaded = true;
        (document?.querySelector('.overlay') as HTMLElement).style.display =
          'none';
        this.common.popUpSuccess();
      } else {
        this.isLoaded = true;
        (document?.querySelector('.overlay') as HTMLElement).style.display =
          'none';
        this.common.popUpFailed(
          'Please check your username,email and old password'
        );
      }
    });
  }
  showOrHide(no:number){
    if(no==1){
      this.isShow1=!this.isShow1
    }
    if(no==2){
      this.isShow2=!this.isShow2
    }
    if(no==3){
      this.isShow3=!this.isShow3
    }
  }
}
