import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sumBy' })
export class SumByPipe implements PipeTransform {
  transform(array: any, prop: string): any {

    return array.reduce(function (prev: any, curr: any) {
      return prev + curr[prop];
    }, 0);
  }
}
