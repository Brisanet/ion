import { ReplaceEmptyPipe } from '../../lib/utils/pipes/replace-empty';
import { PipeStrategy } from './pipe-strategy';

export class ReplaceEmptyPipeStrategy implements PipeStrategy {
  transform(value: string | number, replaceValue: string): string {
    const replateEmpty = new ReplaceEmptyPipe();
    return replateEmpty.transform(value, replaceValue);
  }
}
