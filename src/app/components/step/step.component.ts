import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class StepComponent implements OnInit {
  @Output('step') step = new EventEmitter<number>();
  index = 1;

  constructor() {}

  ngOnInit(): void {}
  chooseStep(step: number, ele: HTMLElement) {
    this.step.emit(step);
    this.index = step;
  }
}
