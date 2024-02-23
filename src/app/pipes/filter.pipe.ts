import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(!arg) return value;
    if(!value) return null;
    if (arg === '' || arg.length < 2) {return value;}
    return value.filter(function (item: any) {
      return JSON.stringify(item).toLowerCase().includes(arg);
    });
  }

}
