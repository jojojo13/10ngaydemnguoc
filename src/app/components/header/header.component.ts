import { CommonService } from './../../services/common.service';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
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
  url=''
  downloadURL=''
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
    private eRef: ElementRef,
    private storage: AngularFireStorage,
    private common:CommonService
  ) {}

  ngOnInit(): void {
    this.common.headerBehavior.subscribe((change)=>{
      this.auth.getUserInfo().subscribe((res: any) => {
        // console.log(res)
        this.auth.user = res.data;
        let words = res.data.name.trim().split(' ');
        this.letter = words[words.length - 1].charAt(0);
        this.auth.userSubject.next(this.auth.user);
        this.emID = res.data.emID;
        this.loadCV()
  
      });
    })
   
  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }

  profile() {
    console.log(this.auth.user);
    this.router.navigateByUrl(`thietlaphoso/chitietnhanvien/info?id=${this.emID}&action=notMenu`);
  }
  loadCV() {
    // this.isLoaded = false;

    var storageRef = this.storage.ref(`uploads/${this.emID}`);
    // this.uvcode = response.data[0].code;

    storageRef.listAll().subscribe(
      (result: any) => {
        if (result.items.length > 0) {
          result.items.forEach((imageRef: any) => {
            // And finally display them

            let extendsionFile = imageRef.name.slice(
              ((imageRef.name.lastIndexOf('.') - 1) >>> 0) + 2
            );

            if (
              extendsionFile.toLowerCase() == 'jpg' ||
              extendsionFile.toLowerCase() == 'png'
            ) {
              imageRef.getDownloadURL().then((url: any) => {
                this.downloadURL = url;
                console.log(url)
                this.url = url;

                // this.isLoaded = true;
              });
            }
            // this.isLoaded = true;
          });
        } else {
          // this.isLoaded = true;
        }
      },
      (error) => {
        // this.isLoaded = true;
        // this.commonService.popUpFailed('Get CV failed!!!');
      }
    );
  }

  toggleDropdown() {
    this.dropdown.nativeElement.classList.toggle('isShow');
  }
}
