import { render, screen } from '@testing-library/angular';
import { DefaultImageDirective } from './defaultImage.directive';

async function sut(src = 'test.png', defaultImage = 'default.png') {
  await render(`<img src="${src}" default="${defaultImage}">`, {
    declarations: [DefaultImageDirective],
  });
  return screen.getByRole('img');
}

describe('Directive: DefaultImage', () => {
  it('should create an image with directive', async () => {
    const image = await sut();
    expect(image).toHaveAttribute('src', 'test.png');
    expect(image).toHaveAttribute('default', 'default.png');
  });
  it('should set default image when error', async () => {
    const spy = jest.spyOn(DefaultImageDirective.prototype, 'updateUrl');
    const image = await sut();
    image.dispatchEvent(new Event('error'));
    expect(spy).toBeCalled();
  });
});
