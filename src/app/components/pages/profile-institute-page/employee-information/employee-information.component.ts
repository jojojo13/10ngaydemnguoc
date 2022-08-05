import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrls: ['./employee-information.component.scss']
})
export class EmployeeInformationComponent implements OnInit {
  id!: number
  action: string = ""
  route = { name: 'View all employee', link: '/thietlaphoso/nhanvien?index=1&size=20' };
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.queryParams['id'];
    this.action = this.activatedRoute.snapshot.queryParams['action'];
  }

}
