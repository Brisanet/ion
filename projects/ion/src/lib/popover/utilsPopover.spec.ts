import { PopoverPosition } from '../core/types';
import { GetPositionsCallbackProps } from '../position/position.service';
import { getPositionsPopover, PopoverPositions } from './utilsPopover';

const host = {
  left: 0,
  top: 0,
  width: 100,
  height: 50,
  right: 100,
  bottom: 50,
};
const element = { width: 50, height: 30 };

const popoverPositionsTest = [
  {
    position: PopoverPosition.TOP_RIGHT,
    expected: { left: 50, top: 0 },
    expectedWhenArrowCenter: { left: 28, top: 0 },
  },
  {
    position: PopoverPosition.TOP_CENTER,
    expected: { left: 25, top: 0 },
    expectedWhenArrowCenter: { left: 25, top: 0 },
  },
  {
    position: PopoverPosition.TOP_LEFT,
    expected: { left: 0, top: 0 },
    expectedWhenArrowCenter: { left: 28, top: 0 },
  },
  {
    position: PopoverPosition.BOTTOM_RIGHT,
    expected: { left: 50, top: 50 },
    expectedWhenArrowCenter: { left: 28, top: 50 },
  },
  {
    position: PopoverPosition.BOTTOM_CENTER,
    expected: { left: 25, top: 50 },
    expectedWhenArrowCenter: { left: 25, top: 50 },
  },
  {
    position: PopoverPosition.BOTTOM_LEFT,
    expected: { left: 0, top: 50 },
    expectedWhenArrowCenter: { left: 28, top: 50 },
  },
  {
    position: PopoverPosition.LEFT_BOTTOM,
    expected: { left: -50, top: 50 },
    expectedWhenArrowCenter: { left: -50, top: 47 },
  },
  {
    position: PopoverPosition.LEFT_CENTER,
    expected: { left: -50, top: 25 },
    expectedWhenArrowCenter: { left: -50, top: 25 },
  },
  {
    position: PopoverPosition.LEFT_TOP,
    expected: { left: -50, top: 0 },
    expectedWhenArrowCenter: { left: -50, top: 3 },
  },
  {
    position: PopoverPosition.RIGHT_BOTTOM,
    expected: { left: 100, top: 50 },
    expectedWhenArrowCenter: { left: 100, top: 47 },
  },
  {
    position: PopoverPosition.RIGHT_CENTER,
    expected: { left: 100, top: 25 },
    expectedWhenArrowCenter: { left: 100, top: 25 },
  },
  {
    position: PopoverPosition.RIGHT_TOP,
    expected: { left: 100, top: 0 },
    expectedWhenArrowCenter: { left: 100, top: 3 },
  },
];

describe('getPositionsPopover', () => {
  describe.each(popoverPositionsTest)(
    'calculates positions correctly',
    ({ position, expected, expectedWhenArrowCenter }) => {
      it(`for ${position} with arrow at center: true`, () => {
        const props = {
          host,
          arrowAtCenter: true,
          element,
        };
        const positions: PopoverPositions = getPositionsPopover(
          props as GetPositionsCallbackProps,
        );
        expect(positions[position]).toEqual(expectedWhenArrowCenter);
      });

      it(`for ${position} with arrow at center: false`, () => {
        const props = { host, arrowAtCenter: false, element };
        const positions: PopoverPositions = getPositionsPopover(
          props as GetPositionsCallbackProps,
        );
        expect(positions[position]).toEqual(expected);
      });
    },
  );
});
