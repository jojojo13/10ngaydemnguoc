import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';
import { CommonService } from 'src/app/services/common.service';
import { ProfileService } from 'src/app/services/profile-service/profile.service';

@Component({
  selector: 'app-edit-candidate-form',
  templateUrl: './edit-candidate-form.component.html',
  styleUrls: ['./edit-candidate-form.component.scss'],
})
export class EditCandidateFormComponent implements OnInit {
  @Output('candidateName') candidateName = new EventEmitter<string>();
  @Input('step') step = 4;
  @Output('candidate') candidate = new EventEmitter<any>();
  @ViewChild('city') city!: HTMLSelectElement;
  name = '';
  index!: number;
  isLoaded = false;
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
  candidateID = -1;
  candidateForm: any;
  nationID!: number;
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private candidateService: CandidateService,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.initForm();
    this.candidateID = this.activatedRoute.snapshot.queryParams['id'];

    this.candidateService.getInfEdit(this.candidateID).subscribe(
      (response: any) => {
        this.candidate = response.data[0];
        this.candidateForm = response.data[0];
        this.nationID = this.candidateForm.nationLive;
        console.log(this.candidateForm);
        this.onSelectedCountry();
        this.loadCountry();
        this.contactForm.get('phone')?.setValue(this.candidateForm.phone);
        this.contactForm.get('email')?.setValue(this.candidateForm.email);
        this.contactForm.get('zalo')?.setValue(this.candidateForm.zalo);
        this.contactForm.get('linkedIn')?.setValue(this.candidateForm.linkedIn);
        this.contactForm.get('facebook')?.setValue(this.candidateForm.facebook);
        this.contactForm.get('name')?.setValue(this.candidateForm.fullName);
        this.contactForm.get('twitter')?.setValue(this.candidateForm.twitter);
        this.contactForm.get('skype')?.setValue(this.candidateForm.skype);
        this.contactForm.get('website')?.setValue(this.candidateForm.website);
        this.contactForm
          .get('dob')
          ?.setValue(this.handleDate(this.candidateForm.dob));
        this.contactForm.get('gender')?.setValue(this.candidateForm.gender);
        this.contactForm.get('major')?.setValue(this.candidateForm.major);
        this.contactForm.get('university')?.setValue(this.candidateForm.school);
        this.contactForm
          .get('graduate')
          ?.setValue(this.handleDate(this.candidateForm.graduate));
        this.contactForm.get('gpa')?.setValue(this.candidateForm.score);

        setTimeout(() => {
          this.contactForm
            .get('country')
            ?.setValue(this.candidateForm.nationLive);
          this.contactForm
            .get('city')
            ?.setValue(this.candidateForm.provinceLive);
          this.isLoaded = true;
        }, 3000);
        this.contactForm.get('awards')?.setValue(this.candidateForm.awards);
        this.contactForm.controls['country'].valueChanges.subscribe((value) => {
          this.nationID = value;
          console.log(this.nationID);
        });
      },
      (err) => {
       
        this.isLoaded = true;
      }
    );
  }

  loadCountry() {
    this.profileService.getNationList().subscribe((response: any) => {
      this.countries = response.data;
    });
  }
  onSelectedCountry() {
    this.profileService.getProvinceByNationId(this.nationID).subscribe(
      (data: any) => {
        this.provinces = data.data;
        console.log(data);
      },
      (err) => {
        this.provinces = undefined;
      }
    );
  }
  initForm() {
    this.contactForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      email: ['', [Validators.required, Validators.email]],
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
      dob: ['', [Validators.required, this.dateValidator]],
      gender: ['', [Validators.required]],
      major: ['', [Validators.maxLength(50)]],
      university: ['', Validators.maxLength(50)],
      graduate: [''],
      gpa: [0, [Validators.min(0), Validators.max(10)]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      awards: ['', Validators.maxLength(80)],
    });
  }
  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control?.value) {
      const today = new Date();
      const dateToCheck = new Date(control.value);
      let age=today.getFullYear()-dateToCheck.getFullYear()
      if (dateToCheck > today) {
        return { invalid: true };
      }else if(age<18){
        return { notEnough: true };
      }
    }
    return null;
  }
  get dob() {
    return this.contactForm.controls['dob'];
  }
  handleDate(date: string) {
    let arr = date.split('-').reverse();
    let txt = '';
    for (let i = 0; i < arr.length; i++) {
      if (i < arr.length - 1) {
        txt = txt + arr[i] + '-';
      } else {
        txt = txt + arr[i];
      }
    }
    return txt;
  }

  editCandidate() {
    (document?.querySelector('.overlay') as HTMLElement
    ).style.display = 'block';
    this.isLoaded = false;
    this.candidateService
      .checkInforCandidateEdit({
        id: this.candidateID,
        phone: this.contactForm.get('phone')?.value,
        email: this.contactForm.get('email')?.value,
      })
      .subscribe(
        (response: any) => {
          if (response.status == true) {
            let obj = {
              id: this.candidateID,
              fullName: this.contactForm.get('name')?.value.trim(),
              dob: this.contactForm.get('dob')?.value,
              gender: this.contactForm.get('gender')?.value,
              phone: this.contactForm.get('phone')?.value,
              zalo: this.contactForm.get('zalo')?.value,
              email: this.contactForm.get('email')?.value,
              linkedIn: this.contactForm.get('linkedIn')?.value,
              facebook: this.contactForm.get('facebook')?.value,
              skype: this.contactForm.get('skype')?.value,
              website: this.contactForm.get('website')?.value,
              twiter: this.contactForm.get('twitter')?.value,
              noiO: '',
              nationLive: this.contactForm.get('country')?.value,
              porvinceLive: this.contactForm.get('city')?.value,
              major: this.contactForm.get('major')?.value,
              graduate: this.contactForm.get('graduate')?.value,
              school: this.contactForm.get('university')?.value,
              gpa: this.contactForm.get('gpa')?.value,
              awards: this.contactForm.get('awards')?.value,
            };
            if (this.contactForm.get('graduate')?.value == '') {
              obj.graduate = null;
            }
            if (this.contactForm.get('gpa')?.value == '') {
              obj.gpa = null;
            }
            console.log(obj);
            this.candidateService.editInfoCan(obj).subscribe(
              (response: any) => {
  
                if (response.status == true) {
                  this.isLoaded = true;
                  this.commonService.popUpSuccess();
                  this.router.navigateByUrl(
                    `ungvien/xemungvien/info?id=${this.candidateID}`
                  );
                } else {
                  (document?.querySelector('.overlay') as HTMLElement
                  ).style.display = 'none';
                  this.isLoaded = true;
                  this.commonService.popUpFailed('Edit failed');
                }
              },
              (err) => {
                (document?.querySelector('.overlay') as HTMLElement
                ).style.display = 'none';
                this.isLoaded = true;
                this.commonService.popUpFailed('Edit failed');
              }
            );
          } else {
            (document?.querySelector('.overlay') as HTMLElement
            ).style.display = 'none';
            this.isLoaded = true;
            this.commonService.popUpFailed(response.thongbao);
          }
        },
        (err) => {
          (document?.querySelector('.overlay') as HTMLElement
          ).style.display = 'none';
          this.isLoaded = true;
          this.commonService.popUpFailed('Something wrong');
        }
      );
  }
}
