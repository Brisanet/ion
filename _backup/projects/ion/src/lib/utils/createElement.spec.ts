import { createElement, CreateElementProps } from './createElement';

const sut = (props?: CreateElementProps): HTMLElement => {
  return createElement(
    props || {
      type: 'span',
      text: 'hello world',
      attributes: [{ key: 'data-testid', value: 'test' }],
    }
  );
};

describe('Create Element', () => {
  it('should create instance', () => {
    const element = sut();
    expect(element).toBeTruthy();
  });
  it('should validate the type', () => {
    const element = sut();
    expect(element.tagName).toBe('SPAN');
  });
  it('should validate the text', () => {
    const element = sut();
    expect(element.innerHTML).toBe('hello world');
  });
  it('should validate the attributes', () => {
    const element = sut();
    expect(element.getAttribute('data-testid')).toBe('test');
  });
});
