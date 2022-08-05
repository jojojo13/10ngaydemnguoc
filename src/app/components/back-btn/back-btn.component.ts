import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
 Input,

  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-btn',
  templateUrl: './back-btn.component.html',
  styleUrls: ['./back-btn.component.scss'],
})
export class BackBtnComponent implements AfterViewInit {
  @ViewChild('backBtn') backBtn!: ElementRef;
  @Input('route') route:any;

  constructor(private router: Router,private location:Location) {}
  ngAfterViewInit(): void {}

  navigate(){
   this.router.navigateByUrl(this.route.link)
  }
}
