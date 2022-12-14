import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { fireEvent, render, screen } from '@testing-library/angular';
import { TooltipColorScheme } from '../core/types';
import { TooltipModule } from './tooltip.module';

@Component({
  template: `
    <p data-testid="hostTooltip" ionTooltip [ionTooltipTitle]="ionTooltipTitle">
      Hover me
    </p>
  `,
})
class HostTestComponent {
  ionTooltipTitle = 'Tooltip';
  ionTooltipColorScheme: TooltipColorScheme = 'dark';
}

const sut = async (props: Partial<HostTestComponent> = {}): Promise<void> => {
  await render(HostTestComponent, {
    componentProperties: props,
    imports: [CommonModule, TooltipModule],
  });
};

describe('Directive: Tooltip', () => {
  beforeEach(async () => {
    await sut();
  });

  it('should render without tooltip', async () => {
    expect(screen.queryByTestId('ion-tooltip')).not.toBeInTheDocument();
  });
  it('should create tooltip and destroy tooltip', async () => {
    fireEvent.mouseEnter(screen.getByTestId('hostTooltip'));
    expect(screen.getByTestId('ion-tooltip')).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByTestId('hostTooltip'));
    expect(screen.queryByTestId('ion-tooltip')).not.toBeInTheDocument();
  });
});
