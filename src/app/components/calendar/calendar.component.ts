import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CalendarOptions,
  EventSourceInput,
  FullCalendarComponent,
} from '@fullcalendar/angular';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  @ViewChild('datePicker') datePicker!: SwalComponent;

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  constructor(
    public readonly swalTargets: SwalPortalTargets,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private candidateService: CandidateService,
    private commonService: CommonService
  ) {}
  ngOnDestroy(): void {}
  addEventForm!: FormGroup;
  calendarOptions!: CalendarOptions;
  Events!: EventSourceInput;
  candidateID!: number;
  requestID!: number;
  isLoaded = true;
  idMeeting!: number;
  addBtn = false;
  editBtn = false;

  ngOnInit(): void {
    this.Events = [];
    this.candidateID = this.activatedRoute.snapshot.queryParams['id'];
    this.requestID = this.activatedRoute.snapshot.queryParams['requestID'];
    this.addEventForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      startDate: [{ value: '', disabled: true }],
      startTime: ['', Validators.required],
      endDate: ['', [Validators.required]],
      endTime: ['', Validators.required],
    });
    this.addEventForm
      .get('startTime')
      ?.addValidators(this.startTimeValidator.bind(this));
    this.addEventForm
      .get('endDate')
      ?.addValidators(this.timeValidator.bind(this));
    this.addEventForm
      .get('endTime')
      ?.addValidators(this.timeValidator.bind(this));
    //Add User form validations
    this.addEventForm.valueChanges.subscribe((x) => {
      let dateToCheck = new Date(this.addEventForm.getRawValue().endDate);
      let dateToCompare = new Date(this.addEventForm.getRawValue().startDate);
      if (dateToCheck < dateToCompare) {
        this.addEventForm.controls['endDate'].setErrors({ invalid: true });
      }
      let a = new Date(
        this.addEventForm.getRawValue().endDate +
          ' ' +
          this.addEventForm.getRawValue().endTime
      );

      let b = new Date(
        this.addEventForm.getRawValue().startDate +
          ' ' +
          this.addEventForm.getRawValue().startTime
      );

      if (a <= b) {
        this.addEventForm.controls['endTime'].setErrors({ invalid: true });
      } else {
        this.addEventForm.controls['endTime'].setErrors({ invalid: false });
      }
    });
    this.getEvents();
    this.initCalendar();
  }
  initCalendar() {
    this.calendarOptions = {};
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this),
      events: this.Events,

      eventTimeFormat: {
        // like '14:30:00'
        hour: '2-digit',
        minute: '2-digit',
        meridiem: true,
      },
      eventColor: 'green',
      editable: true,
      eventAdd: this.addEvent.bind(this),
      eventDrop: this.dropEvent.bind(this),
      eventClick: this.editEvent.bind(this),
      weekNumbers: true,
    };
  }
  getEvents() {
    this.candidateService
      .getScheduleCandidate(this.requestID, this.candidateID)
      .subscribe((response: any) => {
        for (let item of response.data) {
          let newObj = {
            id: item.id,
            title: item.title,
            start: item.startHour,
            end: item.endHour,
          };
          (this.Events as any).push(newObj);
        }
      });
  }

  handleDate(date: Date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    let now = yyyy + '-' + mm + '-' + dd;
    return now;
  }
  handleDateClick(args: any) {
    this.addBtn = true;
    this.editBtn = false;
    if (args.dateStr < this.handleDate(new Date())) {
      this.commonService.popUpFailed('Cannot create meeting in past');
    } else {
      this.addEventForm.reset();
      this.addEventForm.get('startDate')?.setValue(args.dateStr);

      this.datePicker.fire();
    }
  }
  addEvent() {
    let obj = {
      id: 0,
      requestId: this.requestID,
      candidateId: this.candidateID,
      title: this.addEventForm.get('title')?.value,
      startHour:
        this.addEventForm.get('startDate')?.value +
        ' ' +
        this.addEventForm.get('startTime')?.value,
      endHour:
        this.addEventForm.get('endDate')?.value +
        ' ' +
        this.addEventForm.get('endTime')?.value,
      classname: 'interview',
    };

    this.candidateService
      .insertScheduleCandidate(obj)
      .subscribe((response: any) => {
        if (response.status == true) {
          this.ngOnInit();
          // this.initCalendar();
        }
      });
    this.datePicker.close();
  }
  editEvent(args: any) {
    this.addBtn = false;
    this.editBtn = true;
    this.datePicker.fire();
    this.idMeeting = args.event.id;
    let start = this.handleDate(args.event.start);
    let end = this.handleDate(args.event.end);
    this.addEventForm.get('title')?.setValue(args.event.title);

    this.addEventForm.get('startDate')?.setValue(start);
    this.addEventForm
      .get('startTime')
      ?.setValue(args.event.start.toLocaleTimeString());
    this.addEventForm.get('endDate')?.setValue(end);
    this.addEventForm
      .get('endTime')
      ?.setValue(args.event.end.toLocaleTimeString());
  }
  submitEditEvent() {
    let obj = {
      id: this.idMeeting,
      requestId: this.requestID,
      candidateId: this.candidateID,
      title: this.addEventForm.get('title')?.value,
      startHour:
        this.addEventForm.get('startDate')?.value +
        ' ' +
        this.addEventForm.get('startTime')?.value,
      endHour:
        this.addEventForm.get('endDate')?.value +
        ' ' +
        this.addEventForm.get('endTime')?.value,
      classname: 'interview',
    };
    (document?.querySelector('.overlay') as HTMLElement).style.display =
      'block';
    this.isLoaded = false;
    this.candidateService.modifyCandidateSchedule(obj).subscribe(
      (response: any) => {
        if (response.status == true) {
          this.ngOnInit();
          this.isLoaded = true;
          (document?.querySelector('.overlay') as HTMLElement).style.display =
            'none';

          // this.initCalendar();
        } else {
          this.commonService.popUpFailed('Edit failed');
          this.isLoaded = true;
          (document?.querySelector('.overlay') as HTMLElement).style.display =
            'none';
        }
      },
      (err) => {
        this.commonService.popUpFailed('Something wrong');
        this.ngOnInit();
        this.isLoaded = true;
        (document?.querySelector('.overlay') as HTMLElement).style.display =
          'none';
      }
    );
    this.datePicker.close();
  }
  dropEvent(args: any) {
    let a = (this.Events as any).find((x: any) => x.id === args.event.id);
    a.start =
      this.handleDate(args.event.start) +
      ' ' +
      args.event.start.getHours() +
      ':' +
      args.event.start.getMinutes();
  }
  deleteEvent() {
    (document?.querySelector('.overlay') as HTMLElement).style.display =
      'block';
    this.isLoaded = false;
    this.candidateService.deleteScheDule([this.idMeeting]).subscribe(
      (response: any) => {
        if (response.status == true) {
          this.datePicker.close()
          this.ngOnInit();
          this.isLoaded = true;
          (document?.querySelector('.overlay') as HTMLElement).style.display =
            'none';
        } else {
          this.datePicker.close()
          this.commonService.popUpFailed('Delete failed');
          this.ngOnInit();
          this.isLoaded = true;
          (document?.querySelector('.overlay') as HTMLElement).style.display =
            'none';
        }
      },
      (err) => {
        this.datePicker.close()
        this.commonService.popUpFailed('Delete failed');
        this.ngOnInit();
        this.isLoaded = true;
        (document?.querySelector('.overlay') as HTMLElement).style.display =
          'none';
      }
    );
  }

  startTimeValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control?.value) {
      const dateToCheck = new Date(
        this.addEventForm.getRawValue().startDate + ' ' + control.value
      );
      const dateToCompare = new Date();
      if (dateToCheck < dateToCompare) {
        return { invalid: true };
      }
    }
    return null;
  }
  timeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control?.value) {
      let dateToCheck: any;
      let dateToCompare: any;
      if (
        this.addEventForm.getRawValue().startTime == '' ||
        this.addEventForm.getRawValue().endTime == ''
      ) {
        dateToCheck = new Date(this.addEventForm.getRawValue().endDate);
        dateToCompare = new Date(this.addEventForm.getRawValue().startDate);
        if (dateToCheck < dateToCompare) {
          return { invalid: true };
        }
      }
    }

    return null;
  }
  get endDate() {
    return this.addEventForm.controls['endDate'];
  }

  get endTime() {
    return this.addEventForm.controls['endTime'];
  }
  get startTime() {
    return this.addEventForm.controls['startTime'];
  }
}
