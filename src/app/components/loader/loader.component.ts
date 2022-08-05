import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit,OnChanges {
  @Input('isLoaded') isLoaded = false;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {}
}
