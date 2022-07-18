import { render, screen } from '@testing-library/angular';
import { ChipComponent, IonChipProps, Size } from './chip.component';

const sut = async (customProps?: IonChipProps) => {
  await render(ChipComponent, {
    componentProperties: customProps || {
      label: 'chip',
    },
  });
};

describe('ChipComponent', () => {
  it('should render chip component with custom label', async () => {
    await sut();
    expect(screen.getByText('chip')).toBeTruthy();
  });

  it.each(['sm', 'md'])(
    'should render chip component with size %s',
    async (size: Size) => {
      await sut({ label: 'custom-size', size });
      const element = screen.getByText('custom-size');
      expect(element.classList.contains('chip-' + size)).toBeTruthy();
    }
  );

  it('should render chip component disabled', async () => {
    await sut({ label: 'chip', disabled: true });
    const element = screen.getByText('chip');
    expect(element.getAttribute('disabled')).toBeTruthy();
  });
});
