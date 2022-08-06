import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit {
  constructor(private candidateService:CandidateService,private activatedRoute:ActivatedRoute,private router:Router) {}
  index = 1;
  listRequest:any
  id!:number
  isLoaded=true
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.queryParams['id'];
    this.isLoaded=false
    this.candidateService.getRequestInCandidate(this.id).subscribe((response:any)=>{
      console.log(response)
      console.log(this.id)
      this.listRequest=response.data
      this.isLoaded=true
    },err=>{
      this.isLoaded=true
    })

  }
  chooseStep(step: number, ele: HTMLElement) {
    this.index = step;
  }
  navigateToView(request:any){
    this.router.navigateByUrl(`ungvien/xemungvien/applications/request?id=${this.id}&requestID=${request.id}`)

  }
}
