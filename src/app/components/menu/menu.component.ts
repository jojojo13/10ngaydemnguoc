import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  showDropdown(clickedEle: HTMLElement,className:string) {
    let dropDown = document.querySelector('.'+
      className
    ) as HTMLElement;
    if (clickedEle.classList.contains('active')) {
      dropDown.style.opacity = '0';
      dropDown.style.visibility = 'hidden';
      dropDown.style.transform = 'scaleY(0)';
      dropDown.style.height = '0';
    } else {
      dropDown.style.opacity = '1';
      dropDown.style.visibility = 'visible';
      dropDown.style.transform = 'scaleY(1)';
      dropDown.style.height = 'auto';
    }
    clickedEle.classList.toggle('active');

   
  }
}
