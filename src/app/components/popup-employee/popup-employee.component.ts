import { Component, Input, OnInit, Renderer2, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';

@Component({
  selector: 'app-popup-employee',
  templateUrl: './popup-employee.component.html',
  styleUrls: ['./popup-employee.component.scss'],
})
export class PopupEmployeeComponent implements OnInit,OnChanges {
  @Input('dep') dep: any;
  @Output('emp') emp=new EventEmitter<any>()
  isLoaded = false;
  listEmp!: any;
  itemsPerPage = 10;
  totalItems!: number;
  page: number = 1;
  selectedIndex!:number
  message=''
  constructor(
    private orgService: OrganizationService,
    private renderer: Renderer2
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
   this.loadData(this.dep.id,this.page,this.itemsPerPage)
  }
  loadData(depID:number,index:number,size:number){
    this.orgService
    .getEmployeeByOrgID(depID, index-1,size)
    .subscribe((response: any) => {
      this.message=''
      console.log(response)
      this.totalItems = response.totalItem;
      this.listEmp=response.data
    },(err)=>{
    this.listEmp=undefined
    this.message='This department has no employee'
    });
  }

  ngOnInit(): void {
    // this.generateElement();
  } 
  chooseEmp(emp:any,index:number){
    this.selectedIndex=index
    this.emp.emit(emp)
  }
  gty(page:number){
    this.loadData(this.dep.id,page,this.itemsPerPage)
  }
}
