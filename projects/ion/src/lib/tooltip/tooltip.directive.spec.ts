import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { fireEvent, render, screen } from '@testing-library/angular';
import {
  TooltipColorScheme,
  TooltipPosition,
  TooltipTrigger,
} from '../core/types';
import { TooltipModule } from './tooltip.module';

@Component({
  template: `
    <p
      data-testid="hostTooltip"
      ionTooltip
      [ionTooltipTitle]="ionTooltipTitle"
      [ionTooltipColorScheme]="ionTooltipColorScheme"
      [ionTooltipPosition]="ionTooltipPosition"
      [ionTooltipTrigger]="ionTooltipTrigger"
      [ionTooltipShowDelay]="ionTooltipShowDelay"
    >
      Hover me
    </p>
  `,
})
class HostTestComponent {
  ionTooltipTitle = 'Tooltip';
  ionTooltipColorScheme: TooltipColorScheme = 'dark';
  ionTooltipPosition: TooltipPosition = TooltipPosition.DEFAULT;
  ionTooltipTrigger: TooltipTrigger = TooltipTrigger.DEFAULT;
  ionTooltipShowDelay = 0;
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

  it('should destroy tooltip', async () => {
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

  it('should show tooltip after delay time setted', async () => {
    jest.useFakeTimers();
    const timeDelay = 300;
    const { detectChanges } = await render(HostTestComponent, {
      componentProperties: {
        ionTooltipShowDelay: timeDelay,
      },
      imports: [CommonModule, TooltipModule],
    });

    fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
    expect(screen.getByTestId('ion-tooltip')).not.toHaveClass(
      'ion-tooltip--visible'
    );

    jest.advanceTimersByTime(timeDelay);
    detectChanges();
    expect(screen.getByTestId('ion-tooltip')).toHaveClass(
      'ion-tooltip--visible'
    );
  });

  describe('trigger: click', () => {
    afterEach(async () => {
      fireEvent.click(screen.getByTestId('hostTooltip'));
    });

    it('should activate tooltip when clicking when trigger is click', async () => {
      await sut({ ionTooltipTrigger: TooltipTrigger.CLICK });

      fireEvent.click(screen.getByTestId('hostTooltip'));
      expect(screen.getByTestId('ion-tooltip')).toBeInTheDocument();
    });

    it('should remove tooltip when clicking again on element when trigger is click', async () => {
      await sut({ ionTooltipTrigger: TooltipTrigger.CLICK });

      fireEvent.click(screen.getByTestId('hostTooltip'));
      expect(screen.getByTestId('ion-tooltip')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('hostTooltip'));
      expect(screen.queryByTestId('ion-tooltip')).not.toBeInTheDocument();
    });
  });
});
