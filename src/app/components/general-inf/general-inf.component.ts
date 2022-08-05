import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {

  FormBuilder,
  FormGroup,

  Validators,
} from '@angular/forms';

import { CommonService } from 'src/app/services/common.service';
import { ProfileService } from 'src/app/services/profile-service/profile.service';

@Component({
  selector: 'app-general-inf',
  templateUrl: './general-inf.component.html',
  styleUrls: ['./general-inf.component.scss'],
})
export class GeneralInfComponent implements OnInit, OnChanges {
  @Output('candidateName') candidateName = new EventEmitter<string>();
  @Input('step') step = 4;
  @Output('candidate') candidate = new EventEmitter<any>();
  name = '';
  today: string = new Date().toISOString().slice(0, 10);
  genderObject = { name: 'Male', value: 1 };
  contactForm!: FormGroup;
  countries: any;
  selectedCountry: number = 0;
  provinces: any;
  emailPattern = '([a-z0-9]{1,22}\\.)?([a-z0-9]){2,22}\\@(gmail.com)';
  phonePattern = new RegExp('(84|0[0|1|2|3|4|5|6|7|8|9])+([0-9]{8})\\b');
  zaloPattern = new RegExp('(84|0[0|1|2|3|4|5|6|7|8|9])+([0-9]{8})\\b');
  namePattern = '\\w+([[:space:]])\\w+([[:space:]])\\w+$';
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private profileService: ProfileService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
   
    this.contactForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      zalo: ['', [Validators.pattern(this.zaloPattern)]],
      linkedIn: [''],
      facebook: [''],
      twitter: [''],
      skype: [''],
      website: [''],
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$'),
          Validators.maxLength(50),
        ],
      ],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      major: ['', [Validators.maxLength(50)]],
      university: ['', Validators.maxLength(50)],
      graduate: [''],
      gpa: [0, [Validators.min(0), Validators.max(10)]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      awards: ['', Validators.maxLength(80)],
    });
    this.commonService.emitBahavior.subscribe((change) => {
      this.candidate.emit(this.contactForm);
    });
    this.contactForm.valueChanges.subscribe((value) => {
      this.candidate.emit(this.contactForm);
    });
    this.loadCountry();
  }
  onChange() {
    this.candidateName.emit(this.name);
  }

  loadCountry() {
    this.profileService.getNationList().subscribe((response: any) => {
      this.countries = response.data;
    });
  }
  onSelectedCountry() {
    this.profileService
      .getProvinceByNationId(this.contactForm.controls['country'].value.id)
      .subscribe((data: any) => {
        this.provinces = data.data;
      });
  }
}
export class CustomValidators {
}


