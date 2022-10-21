import { render } from '@testing-library/angular';
import { IonInputProps } from './input-contador.component';

const sut = async (customProps?: IonInputProps) => {
  await render('InputCounter', {
    componentProperties: customProps,
    declarations: [],
  });
};

describe('InputCounter', () => {
  it('should render input counter', async () => {
    await sut();
    const element = document.getElementById('input-test');
    expect(element);
  });

  it('should render input counter icon down', async () => {
    await sut();
    const element = document.getElementById('svg-down');
    expect(element).toBeInTheDocument;
  });

  it('should render input counter icon plus', async () => {
    await sut();
    const element = document.getElementById('svg-plus');
    expect(element).toBeInTheDocument;
  });
});
