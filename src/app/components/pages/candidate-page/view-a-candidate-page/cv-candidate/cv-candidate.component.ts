import { Component, Input, OnInit } from '@angular/core';

import { CommonService } from 'src/app/services/common.service';

import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUpload } from 'src/app/models/FileUpload';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';

@Component({
  selector: 'app-cv-candidate',
  templateUrl: './cv-candidate.component.html',
  styleUrls: ['./cv-candidate.component.scss'],
})
export class CvCandidateComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    public sanitizer: DomSanitizer,
    private storage: AngularFireStorage,
    private activatedRoute: ActivatedRoute,
    private candidateService: CandidateService
  ) {}
  @Input('noAttach') noAttach=false;
  selectedFiles!: FileList;
  pdfSrc: any;
  listFile: any;
  fileUpLoad!: FileUpload;
  attach = { name: 'Attach CV' };
  percentage = 0;
  id!: number;
  isLoaded = false;
  downloadURL = '';
  uvcode = '';
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.queryParams['id'];
    this.loadCV();
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.upload();
  }
  getExtendsionFile(fileName: string) {
    return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
  }
  upload(): void {
    const file = this.selectedFiles.item(0) as File;
    let typeFile = this.getExtendsionFile(file.name).toLowerCase();

    if (typeFile == 'pdf' && file.size < 5000000) {
      var storageRef = this.storage.ref('uploads/' + this.uvcode);
      storageRef.listAll().subscribe((result: any) => {
        if (result.items.length > 0) {
          this.commonService.deleteFile(this.downloadURL);
        }
      });
      this.fileUpLoad = new FileUpload(file);

      this.commonService
        .pushFileToStorage(this.fileUpLoad, this.uvcode)
        .subscribe(
          (percentage: any) => {
            this.percentage = Math.round(percentage ? percentage : 0);
            this.loadCV();
          },
          (error: any) => {}
        );
    } else {
      this.commonService.popUpFailed('Must import pdf file and less than 5mb');
    }
  }
  loadCV() {
    this.isLoaded = false;
    this.candidateService.getCandidateById(this.id).subscribe(
      (response: any) => {
        var storageRef = this.storage.ref(`uploads/${response.data[0].code}`);
        this.uvcode = response.data[0].code;
      
        storageRef.listAll().subscribe(
          (result: any) => {
            if (result.items.length > 0) {
              result.items.forEach((imageRef: any) => {
                // And finally display them

                let extendsionFile = imageRef.name.slice(
                  ((imageRef.name.lastIndexOf('.') - 1) >>> 0) + 2
                );

                if (extendsionFile.toLowerCase() == 'pdf') {
                  imageRef.getDownloadURL().then((url: any) => {
                    this.downloadURL = url;
                    this.pdfSrc =
                    this.sanitizer.bypassSecurityTrustResourceUrl(url);
                    this.isLoaded = true;
                  });
                }
              this.isLoaded = true;

              }
              );
            } else {
              this.isLoaded = true;
            }
          },
          (error) => {
            this.isLoaded = true;
            this.commonService.popUpFailed('Get CV failed!!!');
          }
        );
      },
      (err: any) => {
        this.isLoaded = true;
      }
    );
  }
}
