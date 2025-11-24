import { Pipe, PipeTransform } from '@angular/core';
import { SafeAny } from '../../safe-any';

@Pipe({
  name: 'replaceEmpty',
  standalone: true,
})
export class ReplaceEmptyPipe implements PipeTransform {
  transform(value: SafeAny, replaceValue: string): SafeAny {
    if (value === null || value === undefined || value === '') {
      return replaceValue;
    }
    return value;
  }
}
