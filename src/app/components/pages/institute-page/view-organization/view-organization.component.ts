import { Location } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-organization',
  templateUrl: './view-organization.component.html',
  styleUrls: ['./view-organization.component.scss'],
})
export class ViewOrganizationComponent implements OnInit {
  route = { name: 'View Organization', link: '/thietlaptochuc' };
  isLoaded = false;
  organizationList!: any;
  chooseId = 0;
  url = '/thietlaptochuc/tochuc?orgId=0';
  constructor(
    private orgService: OrganizationService,
    private renderer: Renderer2,
    private router: Router,
    private location: Location,
    private commonService: CommonService,
  ) {}

  ngOnInit(): void {
    this.generateElement();
  }
  generateElement() {
    document.body.style.cursor = 'wait';
    this.orgService.getAllOrganization().subscribe((response: any) => {
      this.organizationList = response.data;
      console.log(this.organizationList);
      let content = document.querySelector('.content-middle') as HTMLElement;
      for (let org of this.organizationList) {
        let main = this.renderer.createElement('div');
        this.renderer.addClass(main, 'master');
        let p = this.renderer.createElement('p');
        let span = this.renderer.createElement('span');
        let arrow = this.renderer.createElement('i');
        this.renderer.addClass(arrow, 'fa');
        this.renderer.addClass(arrow, 'fa-chevron-down');
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
        this.renderer.addClass(folderIcon, 'fa');
        this.renderer.addClass(folderIcon, 'fa-folder-open');
        p.appendChild(folderIcon);
        const text = this.renderer.createText(org.name);
        //add click listener
        this.renderer.listen(p, 'click', (evt) => {
          // let department = { id: org.id, name: org.name };
          // this.department.emit(department);

          if (evt.target.classList.contains('isSelected')) {
            evt.target.classList.remove('isSelected');
            this.location.replaceState(`/thietlaptochuc/tochuc?orgId=0`);
            this.url='/thietlaptochuc/tochuc?orgId=0'
          } else {
            let list = document.querySelectorAll('p');
            list.forEach((item) => {
              item.classList.remove('isSelected');
            });
            evt.target.classList.add('isSelected');
            this.location.replaceState(
              `/thietlaptochuc/tochuc?orgId=${org.id}`
            );
            this.url= `/thietlaptochuc/tochuc?orgId=${org.id}`
          }
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
        this.renderer.addClass(arrow, 'fa');
        this.renderer.addClass(arrow, 'fa-chevron-down');
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
        this.renderer.addClass(folderIcon, 'fa');
        this.renderer.addClass(folderIcon, 'fa-folder-open');
        p.appendChild(folderIcon);
        const text = this.renderer.createText(child.name);
        //add click listener
        this.renderer.listen(p, 'click', (evt) => {
          if (evt.target.classList.contains('isSelected')) {
            evt.target.classList.remove('isSelected');
            this.location.replaceState(`/thietlaptochuc/tochuc?orgId=0`);
            this.url = `/thietlaptochuc/tochuc?orgId=0`
            this.chooseId = 0;
          } else {
            let list = document.querySelectorAll('p');
            list.forEach((item) => {
              item.classList.remove('isSelected');
            });
            evt.target.classList.add('isSelected');
            this.location.replaceState(
              `/thietlaptochuc/tochuc?orgId=${child.id}`
            );
            this.url = `/thietlaptochuc/tochuc?orgId=${child.id}`
            this.chooseId = child.id;
          }
        });
        this.renderer.appendChild(p, text);
        div.appendChild(p);
        parent?.appendChild(div);
        this.renderer.setAttribute(div, 'level', child.level);
        this.render(child, div);
      }
    }
  }
  addNew() {
   
    this.router.navigateByUrl(`${this.url}`+'&mode=new')
  }
  edit(){
    this.router.navigateByUrl(`${this.url}`+'&mode=edit')
  }

  delete() {
    if (this.chooseId == 0) {
      this.commonService.popUpMessage('Choose at least one record!!!');
    }
    else {
      Swal.fire({
        text: 'Are you sure to delete Orgnization',
        iconHtml:
          ' <img src="../../../assets/images/icons/ques.jpg" width="100px" alt="">',
        showCancelButton: true,
        confirmButtonColor: '#309EFC',
        cancelButtonColor: '#8B94B2',
        confirmButtonText: 'Confirm',
        width: '380px',
      }).then((result) => {
        if (result.isConfirmed) {
          this.orgService
            .deleteOrg(this.chooseId)
            .subscribe(
              (res: any) => {
                if (res.status == true) {
                  this.generateElement();
                  this.commonService.popUpSuccess();
                  this.chooseId = 0;
                } else {
                  this.commonService.popUpFailed(
                    'Some records have been appplied'
                  );
                }
              },
              (err) => {
                this.commonService.popUpFailed(
                  'Some records have been appplied'
                );
              }
            );
        }
      });
    }
  }
}
