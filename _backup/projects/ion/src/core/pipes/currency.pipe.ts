import { CurrencyPipe } from '@angular/common';
import { PipeStrategy } from './pipe-strategy';

export class CurrencyPipeStrategy implements PipeStrategy {
  transform(value: number): string {
    const locale = 'en-US';
    const currencyPipe = new CurrencyPipe(locale);
    return currencyPipe.transform(value, 'BRL', 'symbol', '1.2-2');
  }
}
