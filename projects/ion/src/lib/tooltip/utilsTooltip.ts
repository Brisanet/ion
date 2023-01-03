import { TooltipPosition } from '../core/types';

interface HostPositions {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export type Positions = {
  [key in TooltipPosition]: Pick<HostPositions, 'left' | 'top'>;
};

export function getPositions(
  { left, right, top, bottom }: HostPositions,
  arrowAtCenter: boolean
): Positions {
  return {
    bottomRight: {
      left: arrowAtCenter
        ? Math.round((right - left) / 2 + left)
        : Math.round(right),
      top: Math.round(top),
    },
    bottomCenter: {
      left: Math.round((right - left) / 2 + left),
      top: Math.round(top),
    },
    bottomLeft: {
      left: arrowAtCenter
        ? Math.round((right - left) / 2 + left)
        : Math.round(left),
      top: Math.round(top),
    },
    topRight: {
      left: arrowAtCenter
        ? Math.round((right - left) / 2 + left)
        : Math.round(right),
      top: Math.round(bottom),
    },
    topCenter: {
      left: Math.round((right - left) / 2 + left),
      top: Math.round(bottom),
    },
    topLeft: {
      left: arrowAtCenter
        ? Math.round((right - left) / 2 + left)
        : Math.round(left),
      top: Math.round(bottom),
    },
    centerRight: {
      left: Math.round(left),
      top: Math.round(top + (bottom - top) / 2),
    },
    centerLeft: {
      left: Math.round(right),
      top: Math.round(top + (bottom - top) / 2),
    },
  };
}
