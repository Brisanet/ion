import { render, screen } from '@testing-library/angular';
import { IonNoDataComponent } from './no-data.component';
import { CommonModule } from '@angular/common';
import { IonIconModule } from '../icon/icon.module';

const customLabel = 'No data';

const testCustomProps: IonNoDataComponent = {
  label: customLabel,
  iconType: 'exclamation-solid',
};

const sut = async (customProps?: IonNoDataComponent): Promise<void> => {
  await render(IonNoDataComponent, {
    componentProperties: customProps,
    imports: [CommonModule, IonIconModule],
  });
};

describe('IonNoDataComponent - default properties', () => {
  beforeEach(async () => {
    await sut();
  });

  it('Should render the default label when no label is informed', async () => {
    expect(screen.getByText('Não há dados')).toBeInTheDocument();
  });

  it('Should render a icon by default', async () => {
    expect(screen.getByTestId('ion-no-data-icon')).toBeInTheDocument();
  });
});

describe('IonNoDataComponent - custom properties', () => {
  beforeEach(async () => {
    await sut(testCustomProps);
  });

  it('Should render the informed label', async () => {
    expect(screen.getByText(customLabel)).toBeInTheDocument();
  });
});
