import { render, screen } from '@testing-library/angular';
import { ChipComponent } from './chip.component';

describe('ChipComponent', () => {
  it('should render chip component with custom label', async () => {
    await render(ChipComponent, {
      componentProperties: {
        label: 'chip',
      },
    });
    expect(screen.getByText('chip')).toBeTruthy();
  });

  it.each(['sm', 'md'])(
    'should render chip component with size %s',
    async (size: 'sm' | 'md') => {
      await render(ChipComponent, {
        componentProperties: {
          label: 'custom-size',
          size,
        },
      });
      const element = screen.getByText('custom-size');
      expect(element.classList.contains('chip-' + size)).toBeTruthy();
    }
  );

  it('should render chip component disabled', async () => {
    await render(ChipComponent, {
      componentProperties: {
        label: 'chip',
        disabled: true,
      },
    });
    const element = screen.getByText('chip');
    expect(element.getAttribute('disabled')).toBeTruthy();
  });
});
