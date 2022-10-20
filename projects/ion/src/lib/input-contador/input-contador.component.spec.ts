import { render } from '@testing-library/angular';
import { IonInputProps } from './input-contador.component';

const sut = async (customProps?: IonInputProps) => {
  await render('InputContador', {
    componentProperties: customProps,
    declarations: [],
  });
};

describe('InputContador', () => {
  it('should render input contador', async () => {
    await sut();
    const element = document.getElementById('input-test');
    expect(element);
  });

  it('should render input contador icon menos', async () => {
    await sut();
    const element = document.getElementById('svg-menos');
    expect(element).toBeInTheDocument;
  });

  it('should render input contador icon mais', async () => {
    await sut();
    const element = document.getElementById('svg-mais');
    expect(element).toBeInTheDocument;
  });
});
