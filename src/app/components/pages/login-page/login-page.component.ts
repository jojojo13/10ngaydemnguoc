import { Account } from '../../../models/Account';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthorizeService } from 'src/app/services/authorize.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  @ViewChild('requestPicker') requestPicker!: SwalComponent;
  loginForm: UntypedFormGroup;
  account: Account;
  msg = '';
  redirectURL = '';
  isLoaded = true;
  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthorizeService,
    private router: Router,
    private route: ActivatedRoute,
    public readonly swalTargets: SwalPortalTargets,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.account = new Account();
  }

  ngOnInit(): void {}
  signIn() {
    this.isLoaded = false;
    this.account = this.loginForm.value;
    (document?.querySelector('.overlay') as HTMLElement).style.display =
      'block';
    this.auth.signIn(this.account).subscribe(
      (obj: any) => {
        if (obj.status == true) {
          localStorage.setItem('token', obj.data);
          (document?.querySelector('.overlay') as HTMLElement).style.display =
            'none';
          this.isLoaded = true;
          let params = this.route.snapshot.queryParams;
          if (params['redirectURL']) {
            this.redirectURL = params['redirectURL'];
          }

          if (this.redirectURL) {
            this.router
              .navigateByUrl(this.redirectURL)
              .catch(() => this.router.navigate(['/yeucautuyendung']));
          } else {
         
            this.router.navigate(['/yeucautuyendung']);
          }
        } else {
          this.msg = obj.mess;
          this.isLoaded = true;

          (document?.querySelector('.overlay') as HTMLElement).style.display =
            'none';
        }
      },
      (err: any) => {
        this.isLoaded = true;

        (document?.querySelector('.overlay') as HTMLElement).style.display =
          'none';
      }
    );
  }
  popupForm(){
    this.requestPicker.fire()
  }
}
