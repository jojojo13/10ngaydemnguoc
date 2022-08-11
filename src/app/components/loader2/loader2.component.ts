import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-loader2',
  templateUrl: './loader2.component.html',
  styleUrls: ['./loader2.component.scss']
})
export class Loader2Component implements OnInit,OnChanges {

  @Input('isLoaded') isLoaded = false;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {}

}
