import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizeService } from 'src/app/services/authorize.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input('user') user: any;
  @ViewChild('dropdown') dropdown!: ElementRef;
  letter = '';
  emID: number = 0;
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.eRef.nativeElement.contains(event.target)) {
      // (document.querySelector('.ad') as HTMLElement).style.display = 'block';
    } else {
      this.dropdown.nativeElement.classList.remove('isShow')
    }
  }
  constructor(
    private router: Router,
    private auth: AuthorizeService,
    private eRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.auth.getUserInfo().subscribe((res: any) => {
      // console.log(res)
      this.auth.user = res.data;
      let words = res.data.name.trim().split(' ');
      this.letter = words[words.length - 1].charAt(0);
      this.auth.userSubject.next(this.auth.user);
      this.emID = res.data.emID;
    });
  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }

  profile() {
    console.log(this.auth.user);
    this.router.navigateByUrl(`thietlaphoso/chitietnhanvien/info?id=${this.emID}&action=notMenu`);
  }

  toggleDropdown() {
    this.dropdown.nativeElement.classList.toggle('isShow');
  }
}
