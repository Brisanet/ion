import { SafeAny } from '../../lib/utils/safe-any';
import { isEmpty } from 'lodash';

export function clearObject<T = SafeAny>(value: SafeAny): T {
  Object.keys(value).map((key) => {
    const isNestedObj =
      value[key] &&
      !Array.isArray(value[key]) &&
      typeof value[key] === 'object';

    const shouldDelete =
      [null, undefined, ''].includes(value[key]) ||
      Number.isNaN(value[key]) ||
      (Array.isArray(value[key]) && isEmpty(value[key]));

    if (isNestedObj) {
      clearObject(value[key]);
    } else if (shouldDelete) {
      delete value[key];
    }
  });
  return value;
}
