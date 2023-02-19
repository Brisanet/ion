import { CommonModule } from '@angular/common';
import { render, screen } from '@testing-library/angular';
import { TooltipPosition, TooltipProps } from '../core/types';
import { IonTooltipComponent } from './tooltip.component';

const tooltipTestId = 'ion-tooltip';

const positions = Object.values(TooltipPosition) as TooltipPosition[];

const defaultProps: TooltipProps = {
  ionTooltipTitle: 'Title',
};

const sut = async (
  props: Partial<IonTooltipComponent> = defaultProps
): Promise<void> => {
  await render(IonTooltipComponent, {
    componentProperties: {
      ...props,
    },
    imports: [CommonModule],
  });
};

describe('IonTooltipComponent', () => {
  it('should render title', async () => {
    const ionTooltipTitle = 'Eu sou um tooltip.';
    await sut({ ionTooltipTitle });
    expect(screen.getByTestId(tooltipTestId)).toHaveTextContent(
      ionTooltipTitle
    );
  });
  it('should render dark color scheme by default', async () => {
    await sut();
    expect(screen.getByTestId(tooltipTestId)).toHaveClass('ion-tooltip-dark');
  });
  it('should render light color scheme', async () => {
    await sut({ ionTooltipColorScheme: 'light' });
    expect(screen.getByTestId(tooltipTestId)).toHaveClass('ion-tooltip-light');
  });
  it.each(positions)(
    'should render tooltip on position %s',
    async (position) => {
      await sut({ ionTooltipPosition: position });
      expect(screen.getByTestId(tooltipTestId)).toHaveClass(
        `ion-tooltip-position--${position}`
      );
    }
  );
  it('should not have visible class when visibility is false', async () => {
    await sut();
    expect(screen.getByTestId(tooltipTestId)).not.toHaveClass(
      'ion-tooltip--visible'
    );
  });
  it('should have visible class when visibility is true', async () => {
    await sut({
      ionTooltipVisible: true,
    });
    expect(screen.getByTestId(tooltipTestId)).toHaveClass(
      'ion-tooltip--visible'
    );
  });
});
