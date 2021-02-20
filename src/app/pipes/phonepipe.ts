import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phonePipe' })
export class PhonePipe implements PipeTransform {
  transform(input: string): string {
    return ( (input === null) || (input.length === 0)) ? '' :
    '('+ input.substring(0,2)  +')' + input.substring(2,7) + '-'+ input.substring(7,11);
  }
}