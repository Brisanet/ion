import { render } from '@testing-library/angular';
import { IonRowComponent } from './row.component';

const sut = async (customProps: IonRowComponent = {}): Promise<HTMLElement> => {
  await render(IonRowComponent, {
    componentProperties: customProps,
    declarations: [],
  });
  return document.getElementById('ion-container-row');
};

describe('IonRowComponent', () => {
  it('should render the row component containing the ion-container and ion-row classes', async () => {
    const IonRowComponent = await sut({});
    expect(IonRowComponent).toHaveClass('ion-container');
    expect(IonRowComponent.children[0]).toHaveClass('ion-row');
  });
});
