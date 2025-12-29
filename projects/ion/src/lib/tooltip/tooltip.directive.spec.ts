import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { fireEvent, render, screen } from '@testing-library/angular';

import {
  TooltipColorScheme,
  TooltipPosition,
  TooltipTrigger,
} from '../core/types';
import { IonTooltipDirective } from './tooltip.directive';

@Component({
  standalone: true,
  imports: [IonTooltipDirective, CommonModule],
  template: `
    <p
      data-testid="hostTooltip"
      ionTooltip
      [ionTooltipTitle]="ionTooltipTitle()"
      [ionTooltipTemplateRef]="ionTooltipTemplateRef() ? ref : null"
      [ionTooltipColorScheme]="ionTooltipColorScheme()"
      [ionTooltipPosition]="ionTooltipPosition()"
      [ionTooltipTrigger]="ionTooltipTrigger()"
      [ionTooltipShowDelay]="ionTooltipShowDelay()"
      [ionTooltipCustomClass]="ionTooltipCustomClass()"
    >
      Hover me
    </p>
    <ng-template #ref>
      <span data-testid="templateRef">Im a template ref</span>
    </ng-template>
  `,
})
class HostTestComponent {
  ionTooltipTitle = input<string>('Tooltip');
  ionTooltipColorScheme = input<TooltipColorScheme>('dark');
  ionTooltipPosition = input<TooltipPosition>(TooltipPosition.DEFAULT);
  ionTooltipTrigger = input<TooltipTrigger>(TooltipTrigger.DEFAULT);
  ionTooltipShowDelay = input<number>(0);
  ionTooltipTemplateRef = input<boolean>(true);
  ionTooltipCustomClass = input<string>('');
}

const sut = async (props: Record<string, any> = {}): Promise<void> => {
  await render(HostTestComponent, {
    componentInputs: props,
  });
};

describe('Directive: Tooltip', () => {
  afterEach(async () => {
    const hostElement = screen.queryByTestId('hostTooltip');
    if (hostElement) {
      fireEvent.mouseLeave(hostElement);
    }
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

  it('should render tooltip with a custom class', async () => {
    const ionTooltipCustomClass = 'custom-class';
    await sut({ ionTooltipCustomClass });

    fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
    const tooltipElement = screen.getByTestId('ion-tooltip');
    expect(tooltipElement.className).toContain(ionTooltipCustomClass);
  });

  it('should not render tooltip when ionTooltipTitle and ionTooltipTemplateRef is empty', async () => {
    const ionTooltipTitle = '';
    await sut({ ionTooltipTitle, ionTooltipTemplateRef: false });

    fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
    expect(screen.queryByTestId('ion-tooltip')).not.toBeInTheDocument();
  });

  it('should render tooltip with a template ref', async () => {
    await sut();

    fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
    expect(screen.getByTestId('templateRef')).toBeInTheDocument();
  });

  it.each(['light', 'dark'] as TooltipColorScheme[])(
    'should render tooltip with %s color scheme',
    async (ionTooltipColorScheme) => {
      await sut({ ionTooltipColorScheme });
      fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
      const tooltipElement = screen.getByTestId('ion-tooltip');
      expect(tooltipElement.className).toContain(
        `ion-tooltip-${ionTooltipColorScheme}`,
      );
    },
  );

  it('should show tooltip after delay time setted', async () => {
    jest.useFakeTimers();
    const timeDelay = 300;
    const { detectChanges } = await render(HostTestComponent, {
      componentInputs: {
        ionTooltipShowDelay: timeDelay,
      },
    });

    fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
    const tooltipElement = screen.getByTestId('ion-tooltip');
    expect(tooltipElement.className).not.toContain('ion-tooltip--visible');

    jest.advanceTimersByTime(timeDelay);
    detectChanges();
    expect(tooltipElement.className).toContain('ion-tooltip--visible');

    jest.useRealTimers();
  });

  it('should reposition the tooltip when exceed the screen size', async () => {
    await sut();
    fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
    const tooltipElement = screen.getByTestId('ion-tooltip');
    expect(tooltipElement.className).toContain(
      `ion-tooltip-position--topCenter`,
    );
  });

  it('should close the tooltip when scrolling the page', async () => {
    await sut();

    fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
    expect(screen.getByTestId('ion-tooltip')).toBeInTheDocument();

    fireEvent.scroll(window);
    expect(screen.queryByTestId('ion-tooltip')).not.toBeInTheDocument();
  });

  describe('trigger: click', () => {
    afterEach(async () => {
      const hostElement = screen.queryByTestId('hostTooltip');
      if (hostElement && screen.queryByTestId('ion-tooltip')) {
        fireEvent.click(hostElement);
      }
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
