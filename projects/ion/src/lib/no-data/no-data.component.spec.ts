import { render, screen } from '@testing-library/angular';
import { IonNoDataComponent } from './no-data.component';
import { CommonModule } from '@angular/common';
import { IonIconModule } from '../icon/icon.module';

const defaultProps: IonNoDataComponent = {
  label: 'Não há dados',
  iconType: 'exclamation-rounded',
};

const sut = async (
  customProps: IonNoDataComponent = defaultProps
): Promise<void> => {
  await render(IonNoDataComponent, {
    componentProperties: customProps,
    imports: [CommonModule, IonIconModule],
  });
};

describe('IonNoDataComponent', () => {
  beforeEach(async () => {
    await sut();
  });
  it('Should render the informed text', async () => {
    expect(screen.getByText('Não há dados')).toBeInTheDocument();
  });

  it('Should render a icon when informed', async () => {
    expect(screen.getByTestId('ion-no-data-icon')).toBeInTheDocument();
  });
});
