import { SafeAny } from '../../lib/utils/safe-any';
import { isEmpty } from './isEmpty';

export function clearObject<T = SafeAny>(value: SafeAny): T {
  Object.keys(value).forEach((key) => {
    if (isNestedObj(value[key])) {
      clearObject(value[key]);
    }

    if (shouldDelete(value[key])) {
      delete value[key];
    }
  });
  return value;
}

function isNestedObj(value: SafeAny): boolean {
  return value && !Array.isArray(value) && typeof value === 'object';
}

function shouldDelete(value: SafeAny): boolean {
  return (
    [null, undefined, ''].includes(value) ||
    Number.isNaN(value) ||
    (Array.isArray(value) && isEmpty(value))
  );
}
