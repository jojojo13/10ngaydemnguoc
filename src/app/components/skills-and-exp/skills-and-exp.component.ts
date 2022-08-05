import { Component, OnInit, Renderer2 } from '@angular/core';

import { CandidateService } from 'src/app/services/candidate-service/candidate.service';
import { CommonService } from 'src/app/services/common.service';
export interface SkillList {
  typeSkill: number;
  type: number;
  level: number;
  goal: string;
}
@Component({
  selector: 'app-skills-and-exp',
  templateUrl: './skills-and-exp.component.html',
  styleUrls: ['./skills-and-exp.component.scss'],
})
export class SkillsAndExpComponent implements OnInit {
  data: any;
  skillCode = '';
  listSkill: SkillList[] = [];
  languageList: any;
  isFirst = true;
  skills: any;
  skillSheets: any;
  candidateSkill: any;
  expList: any;
  candidateExp: any;

  constructor(
    private renderer: Renderer2,
    private commonService: CommonService,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.skills = [];
    this.skillSheets = [];
    this.candidateSkill = [];
    this.expList = [];
    this.candidateExp = [];
    this.languageList = [];
  }
  addLanguage(data: any) {
    const result = this.languageList.find((obj: any) => obj.id == data.id);
    if (result) {
      this.commonService.popUpFailed(data.name + ' is exsisted');
    } else {
      this.languageList.push({ id: data.id });
      this.isFirst = true;
      let newObj = { id: data.id, name: data.name, listSkill: [] };
      let skillSize = { size: data.listSkill.length };
      //create wrapper
      let parent = document.querySelector('.language-content') as HTMLElement;
      let item = this.renderer.createElement('div');
      let itemMain = this.renderer.createElement('div');
      let main = this.renderer.createElement('div');
      let category = this.renderer.createElement('div');
      let trash = this.renderer.createElement('i');

      this.renderer.addClass(item, 'language-content-item');
      this.renderer.addClass(itemMain, 'language-content-item-main');
      this.renderer.addClass(main, 'main');
      this.renderer.addClass(category, 'language-content-item-main-category');
      this.renderer.addClass(trash, 'far');
      this.renderer.addClass(trash, 'fa-trash-alt');
      //create ele in side wrapper
      let pOfMain = this.renderer.createElement('p');
      let pForIcon = this.renderer.createElement('p');
      let icon = this.renderer.createElement('i');
      //create class
      this.renderer.addClass(icon, 'far');
      this.renderer.addClass(icon, 'fa-plus');
      this.renderer.addClass(icon, 'circle-icon');
      pOfMain.innerHTML = data.name;

      this.renderer.listen(pForIcon, 'click', () => {
        this.addCertificationOfSkill(
          category,
          data,
          skillSize,
          pForIcon,
          newObj
        );
        this.candidateService.detectChange.next(true);
      });

      this.renderer.listen(trash, 'click', () => {
        this.deleteItem(parent, item);
        this.listSkill = this.listSkill.filter((skill) => {
          return skill.type != data.id;
        });
        this.languageList.splice(
          this.languageList.findIndex((a: any) => a.id == data.id),
          1
        );

        this.candidateService.skillList =
          this.candidateService.skillList.filter((i: any) => {
            return i.type != data.id;
          });

        this.skills = this.skills.filter((i: any) => {
          return i.id != data.id;
        });
        this.candidateService.otherList = this.skills;
        this.candidateService.skill = data;
        this.candidateService.detectChange.next(true);
        this.candidateService.skillBehaviour.next(true);
      });

      this.renderer.appendChild(pForIcon, icon);
      this.renderer.appendChild(main, pOfMain);
      this.renderer.appendChild(main, pForIcon);
      this.renderer.appendChild(main, trash);
      this.renderer.appendChild(itemMain, main);
      this.renderer.appendChild(itemMain, category);
      this.renderer.appendChild(item, itemMain);
      this.renderer.appendChild(parent, item);
      this.addCertificationOfSkill(category, data, skillSize, pForIcon, newObj);
      this.skills.push(newObj);
      this.candidateService.detectChange.next(true);
    }
  }

  addCertificationOfSkill(
    target: HTMLElement,
    parent: any,
    skillSize: any,
    wrapper: HTMLElement,
    newObj: any
  ) {
    if (parent.listSkill.length > 0) {
      let obj: SkillList = {
        typeSkill: 14,
        type: parent.id,
        level: 0,
        goal: '0',
      };
      let main = this.renderer.createElement('div');
      let input = this.renderer.createElement('input');
      let select = this.renderer.createElement('select');
      let trash = this.renderer.createElement('i');
      let value;

      this.renderer.setAttribute(input, 'type', 'number');

      let result = parent.listSkill.filter(
        (o1: any) => !this.listSkill.some((o2) => o1.id == o2.level)
      );

      for (let i = 0; i < result.length; i++) {
        let option = this.renderer.createElement('option');
        this.renderer.setAttribute(option, 'value', result[i].id);
        option.innerHTML = result[i].name;
        if (i == 0) {
          select.selectedIndex = 0;
        }
        this.renderer.appendChild(select, option);
      }
      let a = { id: 0, name: '', goal: 0 };
      let orig=-1;
      this.renderer.listen(select,'focus',()=>{
        orig=select.options[select.selectedIndex].value;
        console.log(orig)
      })
      this.renderer.listen(select, 'change', () => {
        value = select.options[select.selectedIndex].value;
        let elementPos = this.listSkill
          .map(function (x: any) {
            return x.level;
          })
          .indexOf(value);
        if (elementPos > -1) {
          this.commonService.popUpFailed(
            select.options[select.selectedIndex].text + ' is exsisted'
          );
          select.value = orig;
          console.log( select.options[select.selectedIndex].value )
          return;
        } else {
          obj.level = value;
          a.name = select.options[select.selectedIndex].text;
          this.candidateService.detectChange.next(true);
        }
      });
      this.renderer.listen(trash, 'click', () => {
        this.deleteItem(target, main);
        (wrapper as HTMLElement).style.display = 'block';
        skillSize.size += 1;
        console.log(parent);
        this.listSkill = this.listSkill.filter((skill) => {
          return skill.level != select.options[select.selectedIndex].value;
        });

        this.candidateService.skillList =
          this.candidateService.skillList.filter((o: any) => {
            return o.level != select.options[select.selectedIndex].value;
          });
        newObj.listSkill = newObj.listSkill.filter((obj: any) => {
          return obj.id != select.options[select.selectedIndex].value;
        });
        this.candidateService.detectChange.next(true);
      });

      this.renderer.listen(input, 'change', () => {
        a.goal = input.value;
        obj.goal = input.value;
        this.candidateService.detectChange.next(true);
      });
      obj.level = select.options[select.selectedIndex].value;
      a.name = select.options[select.selectedIndex].text;
      a.id = select.options[select.selectedIndex].value;
      this.renderer.addClass(main, 'main');
      this.renderer.addClass(trash, 'far');
      this.renderer.addClass(trash, 'fa-trash-alt');

      this.renderer.appendChild(main, select);
      this.renderer.appendChild(main, input);
      if (this.isFirst == false) {
        this.renderer.appendChild(main, trash);
      }
      this.renderer.appendChild(target, main);
      this.listSkill.push(obj);
      newObj.listSkill.push(a);
      this.candidateService.skillList = this.listSkill;
      this.candidateService.otherList = this.skills;
      console.log(this.skills);
      this.isFirst = false;
      skillSize.size--;
      this.candidateService.detectChange.next(true);
      if (skillSize.size == 0) {
        (wrapper as HTMLElement).style.display = 'none';
      }
    }
  }
  getDataFromPopup($event: any) {
    this.data = $event;
    this.addLanguage(this.data);
  }
  deleteItem(parent: HTMLElement, child: HTMLElement) {
    parent?.removeChild(child);
  }

  getDifference(array1: any, array2: any) {
    return array1.filter((object1: any) => {
      return !array2.some((object2: any) => {
        return object1.id === object2.level;
      });
    });
  }

  //----------------------FOR SKILLSHEET-------------------------------
  getData($event: any) {
    const result = this.skillSheets.find((obj: any) => obj.id == $event.id);
    if (result) {
      this.commonService.popUpFailed($event.name + ' is exsisted');
    } else {
      let skillSheet = {
        id: $event.id,
        name: $event.name,
        code: $event.code,
        listSkill: [],
      };
      let copiedSkill = {
        id: $event.id,
        name: $event.name,
        code: $event.code,
        listSkill: [],
      };
      this.skillSheets.push(skillSheet);
      this.candidateSkill.push(copiedSkill);

      this.candidateService.skillSheet = this.candidateSkill;
      this.candidateService.detectChange.next(true);
    }
  }
  getChildSkill($event: any, skillsheet: any) {
    let isExsisted = false;

    for (let i = 0; i < this.skillSheets.length; i++) {
      for (let j = 0; j < this.skillSheets[i].listSkill.length; j++) {
        if (this.skillSheets[i].listSkill[j].id == $event.id) {
          isExsisted = true;
          break;
        }
      }
    }
    console.log($event);
    if (!isExsisted) {
      skillsheet.listSkill.push($event);
      let obj = {
        id: $event.id,
        name: $event.name,
        level: $event.listSkill[0].id,
        levelName: $event.listSkill[0].name,
        goal: '',
      };
      for (let i = 0; i < this.candidateSkill.length; i++) {
        if (this.candidateSkill[i].id == skillsheet.id) {
          this.candidateSkill[i].listSkill.push(obj);
          this.candidateService.skillSheet = this.candidateSkill;
          this.candidateService.detectChange.next(true);

          break;
        }
      }
    } else {
      this.commonService.popUpFailed($event.name + ' is exsisted');
    }
  }
  chooseLevel(skillChild: any, ele: any) {
    for (let i = 0; i < this.candidateSkill.length; i++) {
      for (let j = 0; j < this.candidateSkill[i].listSkill.length; j++) {
        if (this.candidateSkill[i].listSkill[j].id == skillChild.id) {
          this.candidateSkill[i].listSkill[j].level = parseInt(ele.value);
          this.candidateSkill[i].listSkill[j].levelName = ele.text;
          this.candidateService.skillSheet = this.candidateSkill;
          this.candidateService.detectChange.next(true);

          break;
        }
      }
    }
  }
  inputChange(skillChild: any, input: HTMLInputElement) {
    for (let i = 0; i < this.candidateSkill.length; i++) {
      for (let j = 0; j < this.candidateSkill[i].listSkill.length; j++) {
        if (this.candidateSkill[i].listSkill[j].id == skillChild.id) {
          this.candidateSkill[i].listSkill[j].goal = input.value;
          this.candidateService.skillSheet = this.candidateSkill;
          this.candidateService.detectChange.next(true);

          break;
        }
      }
    }
  }
  removeSkillSheet(obj: any) {
    this.skillSheets.splice(
      this.skillSheets.findIndex((a: any) => a.id == obj.id),
      1
    );
    this.candidateSkill.splice(
      this.candidateSkill.findIndex((a: any) => a.id == obj.id),
      1
    );
    this.candidateService.skillSheet = this.candidateSkill;
    this.candidateService.detectChange.next(true);
  }
  removeSkillSheetChild(skillChild: any) {
    for (let i = 0; i < this.skillSheets.length; i++) {
      for (let j = 0; j < this.skillSheets[i].listSkill.length; j++) {
        if (this.skillSheets[i].listSkill[j].id == skillChild.id) {
          this.skillSheets[i].listSkill.splice(j, 1);
          break;
        }
      }
    }
    for (let i = 0; i < this.candidateSkill.length; i++) {
      for (let j = 0; j < this.candidateSkill[i].listSkill.length; j++) {
        if (this.candidateSkill[i].listSkill[j].id == skillChild.id) {
          this.candidateSkill[i].listSkill.splice(j, 1);
          break;
        }
      }
    }
    this.candidateService.skillSheet = this.candidateSkill;
    this.candidateService.detectChange.next(true);
  }
  //---------------FOR EXP----------------------
  getFromChild($event: any) {
    const result = this.expList.find((obj: any) => obj.id == $event.id);
    if (result) {
      this.commonService.popUpFailed($event.name + ' is exsisted');
    } else {
      let copiedSkill = {
        id: $event.id,
        name: $event.name,
        code: $event.code,
        listSkill: [],
      };
      this.expList.push(copiedSkill);
      this.candidateService.expList = this.expList;
      this.candidateService.detectChange.next(true);
    }
  }

  addExpChild(exp: any) {
    let obj = { firm: '', position: '', time: '' };
    for (let i = 0; i < this.expList.length; i++) {
      if (this.expList[i].id == exp.id) {
        this.expList[i].listSkill.push(obj);
      }
    }
    this.candidateService.expList = this.expList;
    this.candidateService.detectChange.next(true);
  }
  inputChangeFirm(skillChild: any, input: HTMLInputElement) {
    skillChild.firm = input.value;
    this.candidateService.expList = this.expList;
    this.candidateService.detectChange.next(true);
  }
  inputChangeTime(skillChild: any, input: HTMLInputElement) {
    skillChild.time = input.value;
    this.candidateService.expList = this.expList;
    this.candidateService.detectChange.next(true);
  }
  inputChangePosition(skillChild: any, input: HTMLInputElement) {
    skillChild.position = input.value;
    this.candidateService.expList = this.expList;
    this.candidateService.detectChange.next(true);
    console.log(this.expList)
  }

  removeExp(exp: any) {
    this.expList.splice(
      this.expList.findIndex((a: any) => a.id == exp.id),
      1
    );
    this.candidateService.expList = this.expList;
    this.candidateService.detectChange.next(true);
  }
  removeExpChild(child: any) {
    for (let i = 0; i < this.expList.length; i++) {
      for (let j = 0; j < this.expList[i].listSkill.length; j++) {
        if (this.expList[i].listSkill[j].id == child.id) {
          this.expList[i].listSkill.splice(j, 1);
          break;
        }
      }
    }
    this.candidateService.expList = this.expList;
    this.candidateService.detectChange.next(true);
  }
}
