import { CommonModule } from '@angular/common';
import { render, screen } from '@testing-library/angular';
import { IonInputAreaProps, InputAreaComponent } from './input-area.component';

const sut = async (customProps?: IonInputAreaProps): Promise<void> => {
  await render(InputAreaComponent, {
    componentProperties: customProps,
    imports: [CommonModule],
    declarations: [],
  });
};

describe('InputAreaCompoenent', () => {
  it('', async () => {
    const placeholder = 'Search';
    await sut({ placeholder });
    const input = screen.getByTestId('input-area');
    expect(input).toHaveAttribute('placeholder', placeholder);
  });

  it('', async () => {
    await sut();
    const input = screen.getByTestId('input-area');
    expect(input).not.toHaveAttribute('placeholder');
  });
});
