import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FileUpload } from 'src/app/models/FileUpload';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnChanges {
  @Input('candidateName') candidateName = 'Candidate';
  @Output('imgLINK') imgLINK = new EventEmitter<any>();
  letter = '';
  isgetImg = false;
  selectedFiles!: FileList;
  currentFileUpload!: FileUpload;
  percentage!: number;
  imgURL = '';
  constructor(private commonService: CommonService) {}
  ngOnChanges(changes: SimpleChanges): void {
    let words = this.candidateName.trim().split(' ');
    this.letter = words[words.length - 1].charAt(0);
  }
  getExtendsionFile(fileName: string) {
    return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
  }
  ngOnInit(): void {}
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    this.upload();
  }

  upload(): void {
    const file = this.selectedFiles.item(0) as File;
    let typeFile = this.getExtendsionFile(file.name).toLowerCase();

    if (
      (typeFile.toLowerCase() == 'jpg' || typeFile.toLowerCase() == 'png') &&
      file.size < 5000000
    ) {
      this.currentFileUpload = new FileUpload(file);
      this.commonService.pushFileToStorage2(this.currentFileUpload).subscribe(
        (percentage: any) => {
          this.percentage = Math.round(percentage ? percentage : 0);
          this.commonService.imgBehavior.subscribe((change: boolean) => {
            if (change == true) {
              // this.pdfSrc.emit(this.commonService.fileUrl);
              this.imgURL = this.commonService.imgURL;
              this.imgLINK.emit(this.currentFileUpload);
              this.isgetImg = true;

              // this.fileUpload.emit(this.currentFileUpload);
              this.commonService.imgBehavior.next(false);
            }
          });
        },
        (error: any) => {}
      );
    } else {
      this.commonService.popUpFailed(
        'Must import JPG or PNG and file size less than 5mb'
      );
    }
  }
}
