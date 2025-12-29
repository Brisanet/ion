import { getPositions, Positions } from './utilsTooltip';
import { TooltipPosition } from '../core/types';

let arrowAtCenter: boolean;
let positions: Positions;
const hostDimensions = { left: 0, right: 12, top: 0, bottom: 0 };

const positionsAlignedToHost = [
  { position: 'bottomLeft', pointTo: 'left' },
  {
    position: 'bottomRight',
    pointTo: 'right',
  },
  { position: 'topLeft', pointTo: 'left' },
  {
    position: 'topRight',
    pointTo: 'right',
  },
];

describe('getPositions', () => {
  describe('with arrow pointing at center', () => {
    const horizontalCenter = Math.round(
      (hostDimensions.left + hostDimensions.right) / 2,
    );
    beforeEach(() => {
      arrowAtCenter = true;
      positions = getPositions(hostDimensions, arrowAtCenter);
    });
    it.each(['bottomLeft', 'bottomRight', 'topLeft', 'topRight'])(
      'arrow should point at center of host when position is %s',
      (position) => {
        expect(positions[position as TooltipPosition].left).toBe(
          horizontalCenter,
        );
      },
    );
  });
  describe('with arrow pointing at borders of host', () => {
    beforeEach(() => {
      arrowAtCenter = false;
      positions = getPositions(hostDimensions, arrowAtCenter);
    });
    it.each(positionsAlignedToHost)(
      "when position is $position, arrow should be horizontally aligned to host's $pointTo",
      ({ position, pointTo }) => {
        expect(positions[position as TooltipPosition].left).toBe(
          hostDimensions[pointTo as keyof typeof hostDimensions],
        );
      },
    );
  });
});
