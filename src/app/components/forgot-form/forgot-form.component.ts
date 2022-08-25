import { Router } from '@angular/router';
import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-form',
  templateUrl: './forgot-form.component.html',
  styleUrls: ['./forgot-form.component.scss'],
})
export class ForgotFormComponent implements OnInit {
  forgotForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private common: CommonService,
    private router: Router
  ) {}
    msg=''
  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')],
      ],
      email: ['', [Validators.email, Validators.required]],
    });
  }

  reset() {
    this.msg=''
    let obj = {
      username: this.forgotForm.get('username')?.value,
      email: this.forgotForm.get('email')?.value,
      password: 'fakepass',
    };
    this.common.resetPWD(obj).subscribe((response: any) => {
      if (response.status == true) {
        this.common.popUpSuccess();
        this.router.navigateByUrl('/login');
        this.msg='Reset password successfully'
      } else {
        // this.common.popUpFailed('Username and email do not match');
        this.msg='Username and email do not match'
      }
    });
  }
}
