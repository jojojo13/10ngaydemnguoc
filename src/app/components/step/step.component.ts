import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class StepComponent implements OnInit {
  @Output('step') step = new EventEmitter<number>();
  @Input('form') form: any;
  @Input('isoke') isEmpty=false;
  index = 1;

  constructor(private commonService:CommonService) {}

  ngOnInit(): void {}
  chooseStep(step: number, ele: HTMLElement) {
    console.log(this.isEmpty)
    if (this.form.valid && !this.isEmpty) {
      this.step.emit(step);
      this.index = step;
    }
    else if (this.form.invalid && step != 4 ) {
      this.step.emit(step);
      this.index = step;
    }else{
      this.commonService.popUpFailed('Please fill all mandatory information to get this step ')
    }
  }
  
}
