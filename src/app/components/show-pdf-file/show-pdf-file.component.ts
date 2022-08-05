import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-show-pdf-file',
  templateUrl: './show-pdf-file.component.html',
  styleUrls: ['./show-pdf-file.component.scss'],
})
export class ShowPdfFileComponent implements OnInit, OnChanges {
  @Input('pdfSrc') pdfSrc = '';
  byPassSecurrityURL: any;
  constructor(
    public commonService: CommonService,
    public sanitizer: DomSanitizer
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.byPassSecurrityURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.pdfSrc
    );
    if (this.byPassSecurrityURL) {
      setTimeout(() => {
        this.commonService.deleteFile(this.commonService.fileUrl);
      }, 5000);
    }
  }

  ngOnInit(): void {}
}
