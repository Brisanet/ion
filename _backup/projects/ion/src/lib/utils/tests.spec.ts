import { ToHaveAttribute } from './tests';

describe('Tests Utils', () => {
  it('should check has to have attribute', () => {
    const element = document.createElement('span');
    element.setAttribute('color', 'red');
    expect(ToHaveAttribute(element, 'color', 'red')).toBeTruthy();
  });
});
