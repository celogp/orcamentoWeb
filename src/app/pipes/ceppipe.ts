import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cepPipe' })
export class CepPipe implements PipeTransform {
  transform(input: string): string {
    return input.length === 0 ? '' :
    input.substring(0,2) + '-' +  input.substring(2,5) + '-'+ input.substring(6,9);
  }
}