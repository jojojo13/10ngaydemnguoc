import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { RequestService } from 'src/app/services/request-service/request.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit,OnChanges {
  @Input('req') req:any
  constructor(public requestService:RequestService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.req)
  }

  ngOnInit(): void {
  }

}
