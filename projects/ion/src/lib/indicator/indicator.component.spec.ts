import { CommonModule } from '@angular/common';
import { render, screen } from '@testing-library/angular';
import { ButtonModule } from './../button/button.module';
import { IonIndicatorComponent } from './indicator.component';

const sut = async (): Promise<void> => {
  await render(IonIndicatorComponent, {
    imports: [CommonModule, ButtonModule],
    declarations: [IonIndicatorComponent],
  });
};

describe('IonIndicatorComponent', () => {
  it('Should render IonIndicatorComponent', async () => {
    await sut();
    expect(screen.getByTestId('ion-indicator')).toBeInTheDocument();
  });
});
