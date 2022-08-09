import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-view-a-candidate-page',
  templateUrl: './view-a-candidate-page.component.html',
  styleUrls: ['./view-a-candidate-page.component.scss'],
})
export class ViewACandidatePageComponent implements OnInit {
  route = {
    name: 'View all Candidate',
    link: '/ungvien/xemungvien?index=1&size=20',
  };
  previousUrl = '/';
  currentUrl!: string;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    // this.currentUrl = this.router.url;
    // router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.previousUrl = this.currentUrl;
    //     this.currentUrl = event.url;
    //     if(this.previousUrl==this.currentUrl){
    //       this.previousUrl='/ungvien/xemungvien?index=1&size=20'
    //       console.log('zoday')
    //     }
    //     console.log(this.previousUrl)
    //   };
    // });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      let thing = params['id'];
    });
    let page = this.activatedRoute.snapshot.queryParams['prePage'];
    if (!page) {
      page = 1;
    }
    this.route.link = `/ungvien/xemungvien?index=${page}&size=20`;
  }
}
