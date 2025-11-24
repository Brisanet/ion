import { EllipsisPipe } from './ellipsis.pipe';

const text = 'Hello World';

describe('EllipsisPipe', () => {
  let pipe: EllipsisPipe;

  beforeEach(() => {
    pipe = new EllipsisPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return string without ellipsis if length is less than limit', () => {
    expect(pipe.transform(text, 15)).toEqual(text);
  });

  it('should return string with ellipsis if length is greater than limit', () => {
    expect(pipe.transform(text, 5)).toEqual('Hello...');
  });
});
