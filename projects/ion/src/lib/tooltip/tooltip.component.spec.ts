import { CommonModule } from '@angular/common';
import { render, screen } from '@testing-library/angular';
import { TooltipPosition } from '../core/types';
import { TooltipComponent, TooltipProps } from './tooltip.component';

const positions = Object.values(TooltipPosition) as TooltipPosition[];

const defaultProps: TooltipProps = {
  ionTooltipTitle: 'Title',
};

const sut = async (
  props: Partial<TooltipComponent> = defaultProps
): Promise<void> => {
  await render(TooltipComponent, {
    componentProperties: {
      ...props,
    },
    imports: [CommonModule],
  });
};

describe('TooltipComponent', () => {
  it('should render title', async () => {
    const ionTooltipTitle = 'Eu sou um tooltip.';
    await sut({ ionTooltipTitle });
    expect(screen.getByTestId('ion-tooltip')).toHaveTextContent(
      ionTooltipTitle
    );
  });
  it('should render dark color scheme by default', async () => {
    await sut();
    expect(screen.getByTestId('ion-tooltip')).toHaveClass('ion-tooltip-dark');
  });
  it('should render light color scheme', async () => {
    await sut({ ionTooltipColorScheme: 'light' });
    expect(screen.getByTestId('ion-tooltip')).toHaveClass('ion-tooltip-light');
  });
  it.each(positions)(
    'should render tooltip on position %s',
    async (position) => {
      await sut({ ionTooltipPosition: position });
      expect(screen.getByTestId('ion-tooltip')).toHaveClass(
        `ion-tooltip-position--${position}`
      );
    }
  );
});
