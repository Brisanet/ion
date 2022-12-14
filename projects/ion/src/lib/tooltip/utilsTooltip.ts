import { TooltipPosition } from '../core/types';

interface HostPositions {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

type Positions = {
  [key in TooltipPosition]: Pick<HostPositions, 'left' | 'top'>;
};

export function getPositions({
  left,
  right,
  top,
  bottom,
}: HostPositions): Positions {
  return {
    bottomRight: {
      left: Math.round((right - left) / 2 + left),
      top: Math.round(top),
    },
    bottomCenter: {
      left: Math.round((right - left) / 2 + left),
      top: Math.round(top),
    },
    bottomLeft: {
      left: Math.round((right - left) / 2 + left),
      top: Math.round(top),
    },
    topRight: {
      left: Math.round((right - left) / 2 + left),
      top: Math.round(bottom),
    },
    topCenter: {
      left: Math.round((right - left) / 2 + left),
      top: Math.round(bottom),
    },
    topLeft: {
      left: Math.round((right - left) / 2 + left),
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
