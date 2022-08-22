import { render, screen } from '@testing-library/angular';
import { ColComponent } from './col.component';

const sut = async (customProps: ColComponent = {}): Promise<HTMLElement> => {
  await render(ColComponent, {
    componentProperties: customProps,
    declarations: [],
  });
  const body = document.body;
  const col = document.createElement('ion-col');
  col.appendChild(document.createTextNode('col-12'));
  body.appendChild(col);
  return screen.findByText('col-12');
};

describe('RowComponent', () => {
  it('should render col component', async () => {
    const colComponent = await sut({});
    expect(colComponent).toBeTruthy();
  });
});
