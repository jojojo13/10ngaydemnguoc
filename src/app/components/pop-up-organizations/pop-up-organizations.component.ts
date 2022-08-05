import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';

@Component({
  selector: 'app-pop-up-organizations',
  templateUrl: './pop-up-organizations.component.html',
  styleUrls: ['./pop-up-organizations.component.scss'],
})
export class PopUpOrganizationsComponent implements OnInit {
  @Output('department') department: EventEmitter<any> = new EventEmitter<any>();
  isLoaded = false;
  organizationList!: any;
  constructor(
    private orgService: OrganizationService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.generateElement();
  }
  generateElement() {
    document.body.style.cursor = 'wait';
    this.orgService.getAllOrganization().subscribe((response: any) => {
      this.organizationList = response.data;
      console.log(this.organizationList);
      let content = document.querySelector('.popup') as HTMLElement;
      for (let org of this.organizationList) {
        let main = this.renderer.createElement('div');
        this.renderer.addClass(main, 'master');
        let p = this.renderer.createElement('p');
        let span = this.renderer.createElement('span');
        let arrow = this.renderer.createElement('i');
        this.renderer.addClass(arrow, 'fal');
        this.renderer.addClass(arrow, 'fa-angle-down');
        this.renderer.addClass(arrow, 'down');
        this.renderer.listen(arrow, 'click', (evt) => {
          arrow.classList.toggle('down');
          let parent = arrow.parentElement;
          let wrapper = parent.parentElement;
          let listChildren = wrapper.children;
          for (let child of listChildren) {
            if (child.tagName == 'DIV') {
              child.classList.toggle('hide');
            }
          }
        });
        span.appendChild(arrow);
        main.appendChild(span);
        let folderIcon = this.renderer.createElement('i');
        this.renderer.addClass(folderIcon, 'fas');
        this.renderer.addClass(folderIcon, 'fa-folder');
        p.appendChild(folderIcon);
        const text = this.renderer.createText(org.name);
        //add click listener
        this.renderer.listen(p, 'click', (evt) => {
          let department = { id: org.id, name: org.name };
          this.department.emit(department);
        });
        this.renderer.appendChild(p, text);
        main.appendChild(p);
        content?.appendChild(main);
        this.renderer.setAttribute(main, 'level', org.level);
        this.render(org, main);
      }
      document.body.style.cursor = 'initial';
    });
  }
  render(org: any, parent: HTMLElement) {
    let flag = org.children;
    if (flag.length > 0) {
      for (let child of org.children) {
        let div = this.renderer.createElement('div');
        this.renderer.addClass(div, 'child');
        if (child.level > 2) {
          this.renderer.addClass(div, 'hide');
        }
        let p = this.renderer.createElement('p');
        let span = this.renderer.createElement('span');
        let arrow = this.renderer.createElement('i');
        this.renderer.addClass(arrow, 'fal');
        this.renderer.addClass(arrow, 'fa-angle-down');
        this.renderer.addClass(arrow, 'down');
        this.renderer.listen(arrow, 'click', (evt) => {
          arrow.classList.toggle('down');
          let parent = arrow.parentElement;
          let wrapper = parent.parentElement;
          let listChildren = wrapper.children;
          for (let child of listChildren) {
            if (child.tagName == 'DIV') {
              child.classList.toggle('hide');
            }
          }
        });
        span.appendChild(arrow);
        div.appendChild(span);
        let folderIcon = this.renderer.createElement('i');
        this.renderer.addClass(folderIcon, 'fas');
        this.renderer.addClass(folderIcon, 'fa-folder');
        p.appendChild(folderIcon);
        const text = this.renderer.createText(child.name);
        //add click listener
        this.renderer.listen(p, 'click', (evt) => {
          let department = { id: child.id, name: child.name };
          this.department.emit(department);
        });
        this.renderer.appendChild(p, text);
        div.appendChild(p);
        parent?.appendChild(div);
        this.renderer.setAttribute(div, 'level', child.level);
        this.render(child, div);
      }
    }
  }
}
