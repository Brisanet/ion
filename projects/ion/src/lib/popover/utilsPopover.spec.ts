import { getPositionsPopover, PopoverPositions } from './utilsPopover';

let arrowAtCenter: boolean;
let positions: PopoverPositions;
const hostDimensions = {
  left: 0,
  right: 12,
  top: 0,
  bottom: 0,
  width: 0,
  height: 0,
} as DOMRect;

const popoverDimensions = {
  height: 0,
  width: 0,
  x: 1,
  y: 1,
} as DOMRect;

const positionsAlignedToHost = [
  { position: 'topRight', pointTo: 'left' },
  {
    position: 'topLeft',
    pointTo: 'right',
  },
  { position: 'bottomRight', pointTo: 'left' },
  {
    position: 'bottomLeft',
    pointTo: 'right',
  },
];

describe('getPositions', () => {
  describe('with arrow pointing at center', () => {
    const horizontalCenter = Math.round(
      (hostDimensions.left + hostDimensions.right) / 2
    );
    beforeEach(() => {
      arrowAtCenter = true;
      positions = getPositionsPopover({
        host: hostDimensions,
        element: popoverDimensions,
        arrowAtCenter,
      });
    });
    it.each(['bottomLeft', 'bottomRight', 'topLeft', 'topRight'])(
      'arrow should point at center of host when position is %s',
      (position) => {
        expect(positions[position].left).toBe(horizontalCenter);
      }
    );
  });
  describe('with arrow pointing at borders of host', () => {
    beforeEach(() => {
      arrowAtCenter = false;
      positions = getPositionsPopover({
        host: hostDimensions,
        element: popoverDimensions,
        arrowAtCenter,
      });
    });
    it.each(positionsAlignedToHost)(
      "when position is $position, arrow should be horizontally aligned to host's $pointTo",
      ({ position, pointTo }) => {
        expect(positions[position].left).toBe(hostDimensions[pointTo]);
      }
    );
  });
});
