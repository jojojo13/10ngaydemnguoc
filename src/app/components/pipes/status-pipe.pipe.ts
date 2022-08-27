import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPipe',
})
export class StatusPipePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): string {
    let status = '';
    if(value==0){
      status=''
    }
    if (value == 1) {
      status = 'CV Review';
    }
    if (value == 2) {
      status = 'Scheduling';
    }
    if (value == 3) {
      status = 'Interviewing';
    }
    if (value == 4) {
      status = 'Offering';
    }
    if (value == 5) {
      status = 'Onboarding';
    }
    if (value == 6) {
      status = 'Recruited';
    }
    // if (value == 7) {
    //   status = 'Expired';
    // }

    return status;
  }
}
