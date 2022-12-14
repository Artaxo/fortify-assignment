import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'https'
})
export class HttpsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return 'https://' + value;
  }

}
