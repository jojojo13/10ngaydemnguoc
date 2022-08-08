import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  passwordForm!: FormGroup;
  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPass: ['', Validators.required],
      newPass: ['', [Validators.required]],
      confirmPass: ['', Validators.required ],
    });
    this.passwordForm.get('confirmPass')?.addValidators(this.checkPasswords.bind(this))
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
}
