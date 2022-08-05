import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { CandidateService } from 'src/app/services/candidate-service/candidate.service';

@Component({
  selector: 'app-list-childskill',
  templateUrl: './list-childskill.component.html',
  styleUrls: ['./list-childskill.component.scss'],
})
export class ListChildskillComponent implements OnInit {
  @Input('parentCode') parentCode = '';
  @Output('childSkill') childSkill = new EventEmitter<any>();
  isShow = false;
  childSkills: any;
  isLoaded=false
  constructor(private candidateService: CandidateService) {}
  // @HostListener('document:click', ['$event'])
  // clickout(event: any) {
  //   if (this.eRef.nativeElement.contains(event.target)) {
  //     // (document.querySelector('.ad') as HTMLElement).style.display = 'block';
  //   } else {
  //     (document.querySelector('.ad') as HTMLElement).style.display = 'none';
  //   }
  // }
  ngOnInit(): void {
  
  }
  getSkillType(target: HTMLElement) {
    this.isShow = true;
    this.candidateService
      .getSkillSheet(this.parentCode)
      .subscribe((response: any) => {
        this.childSkills = response.data;
        this.isLoaded=true
      },(err)=>{
        this.isLoaded=true
      });

    (target.children[1] as HTMLElement).classList.add("show");
    (target.children[1] as HTMLElement).classList.remove("hide");
  }
  chooseChildSkill(childSkill: any, target: HTMLElement) {
    // (document.querySelector('.ad') as HTMLElement).style.display = 'none';

    this.childSkill.emit(childSkill);
    this.isShow = false;
    (target.children[1] as HTMLElement).classList.add("hide");
    (target.children[1] as HTMLElement).classList.remove("show");
  }
  hideList(target:HTMLElement){
    (target.children[1] as HTMLElement).classList.add("hide");
    (target.children[1] as HTMLElement).classList.remove("show");

  }
}
