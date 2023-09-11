import { TestBed, getTestBed } from '@angular/core/testing';
import { TooltipService } from './tooltip.service';

const screenWidth = 1440;
const screenHeight = 900;
const tooltipPositions = {
  centerRight: {
    tooltipLeft: 1200,
    tooltipHeight: 88,
    hostPosition: { top: 450, bottom: 538, left: 1200, right: 1380 },
    screenWidth,
    screenHeight,
  },
  bottomCenter: {
    tooltipLeft: 700,
    tooltipHeight: 88,
    hostPosition: { top: 450, bottom: 820, left: 700, right: 880 },
    screenWidth,
    screenHeight,
  },
  centerLeft: {
    tooltipLeft: -20,
    tooltipHeight: 88,
    hostPosition: { top: 750, bottom: 650, left: 0, right: 80 },
    screenWidth,
    screenHeight,
  },
  topRight: {
    tooltipLeft: 1380,
    tooltipHeight: 88,
    hostPosition: { top: 0, bottom: 100, left: 1440, right: 1540 },
    screenWidth,
    screenHeight,
  },
  bottomLeft: {
    tooltipLeft: -20,
    tooltipHeight: 88,
    hostPosition: { top: 880, bottom: 900, left: 0, right: 80 },
    screenWidth,
    screenHeight,
  },
  bottomRight: {
    tooltipLeft: 1300,
    tooltipHeight: 88,
    hostPosition: { top: 880, bottom: 900, left: 1380, right: 1440 },
    screenWidth,
    screenHeight,
  },
};

let injector: TestBed;
let service: TooltipService;

const sut = async (): Promise<void> => {
  TestBed.configureTestingModule({
    providers: [TooltipService],
  });

  injector = getTestBed();
  service = injector.get(TooltipService);
};

describe('TooltipService', () => {
  beforeEach(async () => {
    await sut();
  });

  it.each(Object.entries(tooltipPositions))(
    'should return %s as the new position if at the edges',
    async (positionKey, positionValue) => {
      const positionChecks = service.getTooltipPositions(positionValue);
      const newPosition = service.getNewTooltipPosition(positionChecks);
      expect(newPosition).toBe(positionKey);
    }
  );
});
