import { TestBed, getTestBed } from '@angular/core/testing';
import { TooltipService } from './tooltip.service';
import { TooltipPosition } from '../core/types';

const screenWidth = 1440;
const screenHeight = 900;
const tooltipPositions = {
  [TooltipPosition.TOP_LEFT]: {
    tooltipCoordinates: { width: 208, height: 160, left: 57 },
    hostPosition: { left: 15, right: 117, top: 15, bottom: 47 },
    screenWidth,
    screenHeight,
    currentPosition: TooltipPosition.CENTER_RIGHT,
  },
  [TooltipPosition.TOP_CENTER]: {
    tooltipCoordinates: { width: 208, height: 160, left: 616 },
    hostPosition: { left: 661, right: 778, top: 15, bottom: 47 },
    screenWidth,
    screenHeight,
    currentPosition: TooltipPosition.BOTTOM_CENTER,
  },
  [TooltipPosition.TOP_RIGHT]: {
    tooltipCoordinates: { width: 119, height: 288, left: 1264 },
    hostPosition: { left: 1325, right: 1424, top: 15, bottom: 47 },
    screenWidth: 1440,
    screenHeight: 900,
    currentPosition: TooltipPosition.BOTTOM_LEFT,
  },
  [TooltipPosition.CENTER_LEFT]: {
    tooltipCoordinates: { width: 208, height: 160, left: 116 },
    hostPosition: { left: 15, right: 108, top: 434, bottom: 466 },
    screenWidth,
    screenHeight,
    currentPosition: TooltipPosition.CENTER_LEFT,
  },
  [TooltipPosition.CENTER_RIGHT]: {
    tooltipCoordinates: { width: 119, height: 288, left: 1264 },
    hostPosition: { left: 1325, right: 1424, top: 434, bottom: 466 },
    screenWidth,
    screenHeight,
    currentPosition: TooltipPosition.CENTER_RIGHT,
  },
  [TooltipPosition.BOTTOM_LEFT]: {
    tooltipCoordinates: { width: 208, height: 160, left: 48 },
    hostPosition: { left: 15, right: 99, top: 853, bottom: 885 },
    screenWidth,
    screenHeight,
    currentPosition: TooltipPosition.TOP_RIGHT,
  },
  [TooltipPosition.BOTTOM_CENTER]: {
    tooltipCoordinates: { width: 208, height: 160, left: 616 },
    hostPosition: { left: 661, right: 778, top: 853, bottom: 885 },
    screenWidth,
    screenHeight,
    currentPosition: TooltipPosition.BOTTOM_CENTER,
  },
  [TooltipPosition.BOTTOM_RIGHT]: {
    tooltipCoordinates: { width: 95, height: 416, left: 1300 },
    hostPosition: { left: 1349, right: 1425, top: 853, bottom: 885 },
    screenWidth,
    screenHeight,
    currentPosition: TooltipPosition.TOP_LEFT,
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
      service.setCurrentPosition(positionValue.currentPosition);
      const positionChecks = service.getTooltipPositions(positionValue as any);
      const newPosition = service.checkPositions(positionChecks);
      expect(newPosition).toBe(positionKey);
    },
  );
});
