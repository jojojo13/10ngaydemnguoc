import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getErr',
})
export class ToStringPipe implements PipeTransform {
  transform(value: any, value2: any): unknown {
    
    let isErr = false;
    return isErr;
  }
}
