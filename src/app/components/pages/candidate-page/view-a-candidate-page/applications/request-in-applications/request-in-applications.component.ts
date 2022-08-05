import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Calendar,
  CalendarOptions,
  EventSource,
  EventSourceInput,
} from '@fullcalendar/angular';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-request-in-applications',
  templateUrl: './request-in-applications.component.html',
  styleUrls: ['./request-in-applications.component.scss'],
})
export class RequestInApplicationsComponent implements OnInit {
  constructor(
    public readonly swalTargets: SwalPortalTargets,
    private formBuilder: FormBuilder
  ) {}
  @ViewChild('datePicker') datePicker!: SwalComponent;
  index = 2;
  addEventForm!: FormGroup;
  submitted = false;
  title = 'angularadmintemplates';
  calendarOptions!: CalendarOptions;
  stepNow = 2;
  c!: Calendar;
  Events!: EventSourceInput;
  //Add user form actions
  get f() {
    return this.addEventForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid and reset the validations
    this.addEventForm.get('title')?.setValidators([Validators.required]);
    this.addEventForm.get('title')?.updateValueAndValidity();
    if (this.addEventForm.invalid) {
      return;
    }
  }

  ngOnInit(): void {
    this.Events = [
      {
        title: 'Interview SQL',
        start: '2022-08-04 14:30',
        end: '2022-08-04 15:30',
        className: 'interview',
      },
    ];

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this),
      events: [
        {
          title: 'Interview SQL',
          start: '2022-08-04 14:30',
          end: '2022-08-04 15:30',
          className: 'interview',
        },
      ],

      eventTimeFormat: {
        // like '14:30:00'
        hour: '2-digit',
        minute: '2-digit',
        meridiem: true,
      },
      eventColor: 'green',
      editable: true,
      eventAdd: this.addEvent.bind(this),
    };

    //Add User form validations
    this.addEventForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      startDate: [{ value: '', disabled: true }],
      startTime: ['', Validators.required],
      endDate: [{ value: '', disabled: true }],
      endTime: ['', Validators.required],
    });
  }
  chooseStep(step: number, ele: HTMLElement) {
    if (this.stepNow >= step) {
      this.index = step;
    }
  }
  handleDateClick(args: any) {
    this.datePicker.fire().then((result) => {
      if (result.isConfirmed) {
        
        this.calendarOptions.events = this.calendarOptions.events ;
        (this.calendarOptions.events as any).push({
          title: 'Interview SQL',
          start: '2022-08-05 14:30',
          end: '2022-08-05 15:30',
          className: 'interview',
        });
      }
    });

    this.addEventForm.get('startDate')?.setValue(args.dateStr);
  }
  addEvent(arg: any) {}
  //Hide Modal PopUp and clear the form validations
}
