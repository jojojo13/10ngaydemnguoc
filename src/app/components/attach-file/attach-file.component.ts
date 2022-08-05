import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUpload } from 'src/app/models/FileUpload';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-attach-file',
  templateUrl: './attach-file.component.html',
  styleUrls: ['./attach-file.component.scss'],
})
export class AttachFileComponent implements OnInit {
  @Output() pdfSrc = new EventEmitter<string>();
  @Output() fileUpload = new EventEmitter<FileUpload>();
  @Input('attach') attach: any;
  selectedFiles!: FileList;
  currentFileUpload!: FileUpload;
  percentage!: number;
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {}
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

    if (typeFile=='pdf'&& file.size < 5000000) {
      this.currentFileUpload = new FileUpload(file);
      this.commonService.pushFileToStorage(this.currentFileUpload).subscribe(
        (percentage: any) => {
          this.percentage = Math.round(percentage ? percentage : 0);
          this.commonService.fileBehavior.subscribe((change: boolean) => {
            if (change == true) {
              this.pdfSrc.emit(this.commonService.fileUrl);
              this.fileUpload.emit(this.currentFileUpload);
              this.commonService.fileBehavior.next(false);
            }
          });
        },
        (error: any) => {}
      );
    } else {
      this.commonService.popUpFailed('Must import pdf file and less than 5mb');
    
    }
  }
}
