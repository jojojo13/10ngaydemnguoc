import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-categories-page',
  templateUrl: './location-categories-page.component.html',
  styleUrls: ['./location-categories-page.component.scss']
})
export class LocationCategoriesPageComponent implements OnInit {
  route = { name: 'Location categories', link: '/phanloaitochuc' };
  constructor() { }

  ngOnInit(): void {
  }

}
