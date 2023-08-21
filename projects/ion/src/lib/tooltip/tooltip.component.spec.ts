import { CommonModule } from '@angular/common';
import { render, screen } from '@testing-library/angular';
import { TooltipPosition, TooltipProps } from '../core/types';
import { IonTooltipComponent } from './tooltip.component';

const tooltipTestId = 'ion-tooltip';

const positions = Object.values(TooltipPosition) as TooltipPosition[];

const screenWidth = 1440;
const screenHeight = 900;

const defaultProps: TooltipProps = {
  ionTooltipTitle: 'Title',
};

const sut = async (
  props: Partial<IonTooltipComponent> = defaultProps
): Promise<IonTooltipComponent> => {
  const { fixture } = await render(IonTooltipComponent, {
    componentProperties: {
      ...props,
    },
    imports: [CommonModule],
  });

  const component = fixture.componentInstance;

  return component;
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
  it('should set the tooltip at center right when the host is near the screen right edge', async () => {
    const component = await sut();
    const positionChecks = component.getTooltipPosition(
      1200,
      88,
      { top: 450, bottom: 538, left: 1200, right: 1380 },
      screenWidth,
      screenHeight
    );

    component.setTooltipPosition(positionChecks);
    expect(component.ionTooltipPosition).toBe(TooltipPosition.CENTER_RIGHT);
  });
  it('should set the tooltip at bottom center when the host is near the screen bottom edge', async () => {
    const component = await sut();
    const positionChecks = component.getTooltipPosition(
      700,
      88,
      { top: 450, bottom: 820, left: 700, right: 880 },
      screenWidth,
      screenHeight
    );

    component.setTooltipPosition(positionChecks);
    expect(component.ionTooltipPosition).toBe(TooltipPosition.BOTTOM_CENTER);
  });
  it('should set the tooltip at center left when the host is near the screen left edge', async () => {
    const component = await sut();
    const positionChecks = component.getTooltipPosition(
      -20,
      88,
      { top: 750, bottom: 650, left: 0, right: 80 },
      screenWidth,
      screenHeight
    );

    component.setTooltipPosition(positionChecks);
    expect(component.ionTooltipPosition).toBe(TooltipPosition.CENTER_LEFT);
  });
  it('should set the tooltip at top right when the host is near the screen top right corner', async () => {
    const component = await sut();
    const positionChecks = component.getTooltipPosition(
      1380,
      88,
      { top: 0, bottom: 100, left: 1440, right: 1540 },
      screenWidth,
      screenHeight
    );

    component.setTooltipPosition(positionChecks);
    expect(component.ionTooltipPosition).toBe(TooltipPosition.TOP_RIGHT);
  });
  it('should set the tooltip at bottom left when the host is near the screen bottom left corner', async () => {
    const component = await sut();
    const positionChecks = component.getTooltipPosition(
      -20,
      88,
      { top: 880, bottom: 900, left: 0, right: 80 },
      screenWidth,
      screenHeight
    );

    component.setTooltipPosition(positionChecks);
    expect(component.ionTooltipPosition).toBe(TooltipPosition.BOTTOM_LEFT);
  });
  it('should set the tooltip at bottom right when the host is near the screen bottom right corner', async () => {
    const component = await sut();
    const positionChecks = component.getTooltipPosition(
      1300,
      88,
      { top: 880, bottom: 900, left: 1380, right: 1440 },
      screenWidth,
      screenHeight
    );

    component.setTooltipPosition(positionChecks);
    expect(component.ionTooltipPosition).toBe(TooltipPosition.BOTTOM_RIGHT);
  });
});
