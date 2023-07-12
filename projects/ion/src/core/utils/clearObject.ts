import { SafeAny } from '../../lib/utils/safe-any';
import { isEmpty } from 'lodash';

export function clearObject<T = SafeAny>(value: SafeAny): T {
  Object.keys(value).map((key) => {
    if (
      value[key] &&
      !Array.isArray(value[key]) &&
      typeof value[key] === 'object'
    ) {
      clearObject(value[key]);
    } else if (
      [null, undefined, ''].includes(value[key]) ||
      Number.isNaN(value[key]) ||
      (Array.isArray(value[key]) && isEmpty(value[key]))
    ) {
      delete value[key];
    }
  });
  return value;
}
