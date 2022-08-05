import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-popup-for-candidate',
  templateUrl: './popup-for-candidate.component.html',
  styleUrls: ['./popup-for-candidate.component.scss'],
})
export class PopupForCandidateComponent implements OnInit, OnChanges {
  @Input('skillCode') skillCode = '';
  @Output('data') data = new EventEmitter<any>();
  listSkill: any;

  selectedSkill: any;
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.eRef.nativeElement.contains(event.target)) {
      (document.querySelector('.list') as HTMLElement).style.display = 'block';
    } else {
      (document.querySelector('.list') as HTMLElement).style.display = 'none';
    }
  }
  constructor(
    private candidateService: CandidateService,
    private commonSerice: CommonService,
    private eRef: ElementRef
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    // this.listSkill=[]
    this.candidateService.skillBehaviour.subscribe((change) => {
      if (change == true) {
        this.listSkill.push(this.candidateService.skill);
      }
    });
  }
  chooseSkill(select: HTMLSelectElement) {
    this.data.emit(this.selectedSkill);
    this.listSkill = this.listSkill.filter((x: any) => {
      return x.id != this.selectedSkill.id;
    });
    (document.querySelector('.list') as HTMLElement).style.display = 'none';
  }
  showSelectList() {
    if (this.skillCode != '') {
  
      this.candidateService.getSkillSheet(this.skillCode).subscribe(
        (response: any) => {
          this.listSkill = response.data;
          console.log(this.listSkill);
        },
        (err) => {
          this.commonSerice.popUpFailed('Something wrong');
        }
      );
    }
    (document.querySelector('.list') as HTMLElement).style.display = 'block';
  }
}
