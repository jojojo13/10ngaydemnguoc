import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';

@Component({
  selector: 'app-organization-poppup',
  templateUrl: './organization-poppup.component.html',
  styleUrls: ['./organization-poppup.component.scss'],
})
export class OrganizationPoppupComponent implements OnInit {
  baseUrl = 'https://localhost:44376/api/OrgnizationAPI/GetAllOrg';
  constructor(private organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.organizationService.getAllOrganization().subscribe((response) => {
  
    });
  }

  toggleBranch(ele: HTMLElement) {
    let siblings: any = [];
    // if no parent, return no sibling
    if (!ele.parentNode) {
      return siblings;
    }
    // first child of the parent node
    let sibling = ele.parentNode.firstChild as HTMLElement;
   
    // collecting siblings
    while (sibling) {
      if (sibling.nodeType === 1 && sibling !== ele) {
        siblings.push(sibling);
        sibling.classList.toggle('isShow');
      }
      sibling = sibling.nextSibling as HTMLElement;
    }
  
  }
}
