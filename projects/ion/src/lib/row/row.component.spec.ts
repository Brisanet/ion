import { render } from '@testing-library/angular';
import { RowComponent } from './row.component';

const sut = async (customProps: RowComponent = {}): Promise<HTMLElement> => {
  await render(RowComponent, {
    componentProperties: customProps,
    declarations: [],
  });
  return document.getElementById('ion-container-row');
};

describe('RowComponent', () => {
  it('should render the row component containing the ion-container and ion-row classes', async () => {
    const rowComponent = await sut({});
    expect(rowComponent).toHaveClass('ion-container');
    expect(rowComponent.children[0]).toHaveClass('ion-row');
  });
});
