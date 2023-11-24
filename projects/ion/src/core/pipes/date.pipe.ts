import { DatePipe } from '@angular/common';
import { PipeStrategy } from './pipe-strategy';

export class DatePipeStrategy implements PipeStrategy {
  transform(value: string, format: string): string {
    console.log('formatar:', value);
    const locale = 'en-US';
    const datePipe = new DatePipe(locale);
    return datePipe.transform(value, format);
  }
}
