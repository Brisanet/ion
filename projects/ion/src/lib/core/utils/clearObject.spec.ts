import { clearObject } from './clearObject';

const mock = {
  nullKey: null,
  undefinedKey: undefined,
  emptyStringKey: '',
  nanKey: NaN,
  emptyArray: [],
};

const mockNestedObject = {
  nullKeyInsideObject: {
    key: null,
  },
};

const mockFalsyValues = {
  zero: 0,
  false: false,
};

describe('BrisanetCore Utils - clear-object', () => {
  it.each(Object.keys(mock))('should remove %s from the object ', (key) => {
    expect(clearObject(mock)[key]).toBeUndefined();
  });

  it('should deep clean the object', () => {
    expect(clearObject(mockNestedObject).nullKeyInsideObject).toEqual({});
  });

  it('should return same object when a key have a non-empty value', () => {
    mock.emptyStringKey = 'abcdef';
    expect(clearObject(mock)).toEqual(mock);
  });

  it.each(Object.keys(mockFalsyValues))(
    'should not remove an relevant falsy value such as %s',
    (key) => {
      expect(clearObject(mockFalsyValues)[key]).toEqual(mockFalsyValues[key]);
    }
  );
});
