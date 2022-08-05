import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-combobox-for-candidate',
  templateUrl: './combobox-for-candidate.component.html',
  styleUrls: ['./combobox-for-candidate.component.scss'],
})
export class ComboboxForCandidateComponent implements OnInit {
  @Output('childSkill') childSkill = new EventEmitter<any>();
  listSkill: any;
  isLoaded = false;

  constructor(
    private candidateService: CandidateService,
    private commonSerice: CommonService,
    private eRef: ElementRef
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    
  }

  getSkillType(target: HTMLElement) {
  
    this.candidateService.getSkillType().subscribe(
      (response: any) => {
        this.listSkill = response.data;
        this.isLoaded = true;
      },
      (err) => {
        this.isLoaded = true;
        this.commonSerice.popUpFailed('Something wrong');
      }
    );

    (target.children[1] as HTMLElement).classList.add('show');
    (target.children[1] as HTMLElement).classList.remove('hide');
  }
  chooseChildSkill(childSkill: any, target: HTMLElement) {
    // (document.querySelector('.ad') as HTMLElement).style.display = 'none';

    this.childSkill.emit(childSkill);

    (target.children[1] as HTMLElement).classList.add('hide');
    (target.children[1] as HTMLElement).classList.remove('show');
  }
  hideList(target:HTMLElement){
    (target.children[1] as HTMLElement).classList.add('hide');
    (target.children[1] as HTMLElement).classList.remove('show');

  }
}
