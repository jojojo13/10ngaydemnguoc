import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { FileUpload } from 'src/app/models/FileUpload';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-general-inf-candidate',
  templateUrl: './general-inf-candidate.component.html',
  styleUrls: ['./general-inf-candidate.component.scss'],
})
export class GeneralInfCandidateComponent implements OnInit {
  id!: number;
  candidate: any;
  languageList: any;
  skillSheetList: any;
  expList: any;
  outSource: any;
  isLoaded = false;
  letter = '';
  imgURL!: string;
  selectedFiles!: FileList;
  uvCode = '';
  fileUpLoad!: FileUpload;
  constructor(
    private activatedRoute: ActivatedRoute,
    private candidateService: CandidateService,
    private commonService: CommonService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.queryParams['id'];
    this.candidateService
      .getCandidateById(this.id)
      .subscribe((response: any) => {
        this.uvCode = response.data[0].code;
        this.loadCV();
        this.candidate = response.data[0];
        console.log(this.candidate);
        let words = this.candidate.fullName.trim().split(' ');
        this.letter = words[words.length - 1].charAt(0);
        if (response.data[0].language.length > 0) {
          this.languageList = response.data[0].language[0].child;
        }
        if (response.data[0].skillSheet.length > 0) {
          this.skillSheetList = response.data[0].skillSheet;
        }
        if (response.data[0].domain.length > 0) {
          this.expList = response.data[0].domain;
        }
        if (response.data[0].outSource.length > 0) {
          this.outSource = response.data[0].outSource;
        }

        this.isLoaded = true;
      });
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

    if (
      (typeFile.toLowerCase() == 'jpg' || typeFile.toLowerCase() == 'png') &&
      file.size < 5000000
    ) {
      var storageRef = this.storage.ref('uploads/' + this.uvCode);

      storageRef.listAll().subscribe((result: any) => {
        if (result.items.length > 0) {
          this.commonService.deleteFile(this.imgURL);
        }
      });
      this.fileUpLoad = new FileUpload(file);

      this.commonService
        .pushFileToStorage(this.fileUpLoad, this.uvCode)
        .subscribe(
          (percentage: any) => {
            this.loadCV();
          },
          (error: any) => {}
        );
    } else {
      this.commonService.popUpFailed(
        'Must import jpg or png file and less than 5mb'
      );
    }
  }
  loadCV() {
    var storageRef = this.storage.ref('uploads/' + this.uvCode);

    storageRef.listAll().subscribe(
      (result: any) => {
        if (result.items.length > 0) {
          result.items.forEach((imageRef: any) => {
            // And finally display them
            let extendsionFile = imageRef.name.slice(
              ((imageRef.name.lastIndexOf('.') - 1) >>> 0) + 2
            );

            if (
              extendsionFile.toLowerCase() == 'jpg' ||
              extendsionFile.toLowerCase() == 'png'
            ) {
              imageRef.getDownloadURL().then((url: any) => {
                this.imgURL = url;
                this.isLoaded = true;
              });
            }
          });
        } else {
          this.isLoaded = true;
        }
      },
      (error) => {
        this.isLoaded = true;
        this.commonService.popUpFailed('Get CV failed!!!');
      }
    );
  }
}
