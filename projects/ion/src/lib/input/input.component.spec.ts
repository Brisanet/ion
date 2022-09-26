import { IonIconComponent } from './../icon/icon.component';
import { render, screen } from '@testing-library/angular';

import { InputComponent, IonInputProps } from './input.component';

const sut = async (customProps?: IonInputProps) => {
  await render(InputComponent, {
    componentProperties: customProps || {
      label: 'input',
    },
    declarations: [IonIconComponent],
  });
};

describe(InputComponent, () => {
  it('', async () => {
    await sut({ label: 'input', icon: 'trash' });
  });

  it('should render input component with custom label', async () => {
    await sut();
    expect(screen.getByText('input')).toBeTruthy();
  });

  it.skip('should render input component disabled', async () => {
    await sut({ disabled: true });
    const element = screen.getByText('input');
    expect(element).toHaveAttribute('disabled');
  });

  it.skip('should render icon trash when has options', async () => {
    const icon = document.getElementById('');
    expect(icon).toBeInTheDocument();
  });
});
