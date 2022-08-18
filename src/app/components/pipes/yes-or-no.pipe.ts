import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesOrNo'
})
export class YesOrNoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
   let rs=value==1?'Included':'Not Included'
   return rs
  }

}
