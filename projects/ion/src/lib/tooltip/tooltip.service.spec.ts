import { TestBed, getTestBed } from '@angular/core/testing';
import { TooltipService } from './tooltip.service';

const screenWidth = 1440;
const screenHeight = 900;
const tooltipPositions = {
  centerRight: {
    tooltipCoordinates: {
      left: 1200,
      height: 88,
      width: 300,
    },
    tooltipHeight: 88,
    hostPosition: { top: 450, bottom: 538, left: 1200, right: 1380 },
    screenWidth,
    screenHeight,
  },
  bottomCenter: {
    tooltipCoordinates: {
      left: 700,
      height: 88,
      width: 300,
    },
    hostPosition: { top: 450, bottom: 820, left: 700, right: 880 },
    screenWidth,
    screenHeight,
  },
  centerLeft: {
    tooltipCoordinates: {
      left: -20,
      height: 88,
      width: 300,
    },
    hostPosition: { top: 750, bottom: 650, left: 0, right: 80 },
    screenWidth,
    screenHeight,
  },
  topRight: {
    tooltipCoordinates: {
      left: 1380,
      height: 88,
      width: 300,
    },
    hostPosition: { top: 0, bottom: 100, left: 1440, right: 1540 },
    screenWidth,
    screenHeight,
  },
  bottomLeft: {
    tooltipCoordinates: {
      left: -20,
      height: 88,
      width: 300,
    },
    hostPosition: { top: 880, bottom: 900, left: 0, right: 80 },
    screenWidth,
    screenHeight,
  },
  bottomRight: {
    tooltipCoordinates: {
      left: 1300,
      height: 88,
      width: 300,
    },
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
      const newPosition = service.checkPositions(positionChecks);
      expect(newPosition).toBe(positionKey);
    }
  );
});
