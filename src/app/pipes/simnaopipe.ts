import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'simnaoPipe' })
export class SimNaoPipe implements PipeTransform {
  transform(input: boolean): string {
    return input === true ? 'Sim' : 'Não';
  }
}