import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { fireEvent, render, screen } from '@testing-library/angular';
import { TooltipColorScheme, TooltipPosition } from '../core/types';
import { TooltipModule } from './tooltip.module';

@Component({
  template: `
    <p
      data-testid="hostTooltip"
      ionTooltip
      [ionTooltipTitle]="ionTooltipTitle"
      [ionTooltipColorScheme]="ionTooltipColorScheme"
      [ionTooltipPosition]="ionTooltipPosition"
    >
      Hover me
    </p>
  `,
})
class HostTestComponent {
  ionTooltipTitle = 'Tooltip';
  ionTooltipColorScheme: TooltipColorScheme = 'dark';
  ionTooltipPosition: TooltipPosition = TooltipPosition.DEFAULT;
}

const sut = async (props: Partial<HostTestComponent> = {}): Promise<void> => {
  await render(HostTestComponent, {
    componentProperties: props,
    imports: [CommonModule, TooltipModule],
  });
};

describe('Directive: Tooltip', () => {
  afterEach(async () => {
    fireEvent.mouseLeave(screen.getByTestId('hostTooltip'));
  });

  it('should render without tooltip', async () => {
    await sut();
    expect(screen.queryByTestId('ion-tooltip')).not.toBeInTheDocument();
  });

  it('should create tooltip', async () => {
    await sut();
    fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
    expect(screen.getByTestId('ion-tooltip')).toBeInTheDocument();
  });

  it('should create tooltip and destroy tooltip', async () => {
    await sut();
    fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
    expect(screen.getByTestId('ion-tooltip')).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByTestId('hostTooltip'));
    expect(screen.queryByTestId('ion-tooltip')).not.toBeInTheDocument();
  });

  it('should render tooltip with correct title', async () => {
    const ionTooltipTitle = 'Hello world!';
    await sut({ ionTooltipTitle });

    fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
    expect(screen.getByText(ionTooltipTitle)).toBeInTheDocument();
  });

  it.each(['light', 'dark'] as TooltipColorScheme[])(
    'should render tooltip with %s color scheme',
    async (ionTooltipColorScheme) => {
      await sut({ ionTooltipColorScheme });
      fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
      expect(screen.getByTestId('ion-tooltip')).toHaveClass(
        `ion-tooltip-${ionTooltipColorScheme}`
      );
    }
  );

  it.each(Object.values(TooltipPosition))(
    'should render tooltip on %s position',
    async (ionTooltipPosition) => {
      await sut({ ionTooltipPosition });
      fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
      expect(screen.getByTestId('ion-tooltip')).toHaveClass(
        `ion-tooltip-position--${ionTooltipPosition}`
      );
    }
  );
});
