import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { render, screen } from '@testing-library/angular';
import { IonInputAreaProps, InputAreaComponent } from './input-area.component';

const sut = async (customProps?: IonInputAreaProps): Promise<void> => {
  await render(InputAreaComponent, {
    componentProperties: customProps,
    imports: [CommonModule, FormsModule],
    declarations: [],
  });
};

describe('InputAreaComponent', () => {
  it('should render input with a given placeholder', async () => {
    const placeholder = 'Search';
    await sut({ placeholder });
    const input = screen.getByTestId('input-area');
    expect(input).toHaveAttribute('placeholder', placeholder);
  });

  it('should render input with an empty placeholder if none is passed', async () => {
    await sut();
    const input = screen.getByTestId('input-area');
    expect(input).not.toHaveAttribute('placeholder');
  });

  it('should render input columns default', async () => {
    await sut();
    const input = screen.getByTestId('input-area');
    expect(input).toHaveAttribute('cols', '30');
  });

  it('should render input colunms when changed', async () => {
    const cols = '31';
    await sut({ cols });
    const input = screen.getByTestId('input-area');
    expect(input).toHaveAttribute('cols', cols);
  });

  it('should render input rows default', async () => {
    await sut();
    const input = screen.getByTestId('input-area');
    expect(input).toHaveAttribute('rows', '5');
  });

  it('should render input rows when changed', async () => {
    const rows = '6';
    await sut({ rows });
    const input = screen.getByTestId('input-area');
    expect(input).toHaveAttribute('rows', rows);
  });
});
