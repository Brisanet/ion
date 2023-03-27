import { render, screen } from '@testing-library/angular';
import { IonColComponent } from './col.component';

const sut = async (customProps: IonColComponent = {}): Promise<HTMLElement> => {
  await render(IonColComponent, {
    componentProperties: customProps,
    declarations: [],
  });
  const body = document.body;
  const col = document.createElement('ion-col');
  col.appendChild(document.createTextNode('col-12'));
  body.appendChild(col);
  return screen.findByText('col-12');
};

describe('IonRowComponent', () => {
  it('should render col component', async () => {
    const IonColComponent = await sut({});
    expect(IonColComponent).toBeTruthy();
  });
});
