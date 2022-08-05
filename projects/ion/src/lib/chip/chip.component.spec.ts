import { fireEvent, render, screen } from '@testing-library/angular';
import { IonIconComponent } from '../icon/icon.component';
import { ChipComponent, IonChipProps, ChipSize } from './chip.component';

const sut = async (customProps?: IonChipProps) => {
  await render(ChipComponent, {
    componentProperties: customProps || {
      label: 'chip',
    },
    declarations: [IonIconComponent],
  });
};

describe('ChipComponent', () => {
  it('should render chip component with custom label', async () => {
    await sut();
    expect(screen.getByText('chip')).toBeTruthy();
  });

  it.each(['sm', 'md'])(
    'should render chip component with size %s',
    async (chipSize: ChipSize) => {
      await sut({ label: 'custom-size', chipSize });
      const element = screen.getByText('custom-size');
      expect(element).toHaveClass('chip-' + chipSize);
    }
  );

  it('should render chip component disabled', async () => {
    await sut({ label: 'chip', disabled: true });
    const element = screen.getByText('chip');
    expect(element).toHaveAttribute('disabled');
  });

  it('should select chip', async () => {
    await sut();
    const element = screen.getByText('chip');
    fireEvent.click(element);
    expect(element).toHaveClass('chip-selected');
  });
});
