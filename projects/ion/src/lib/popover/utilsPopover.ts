import { PopoverPosition } from '../core/types/popover';

interface Hostpositions {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export type PopoverPositions = {
  [key in PopoverPosition]: Pick<Hostpositions, 'left' | 'top'>;
};

export function getPositionsPopover(
  { left, right, top, bottom }: Hostpositions,
  arrowAtCenter: boolean
): PopoverPositions {
  const horizontalCenter = Math.round((right - left) / 2 + left);
  return {
    topLeft: {
      left: arrowAtCenter ? horizontalCenter : Math.round(right),
      top: Math.round(top),
    },
    topCenter: {
      left: horizontalCenter,
      top: Math.round(top),
    },
    topRight: {
      left: arrowAtCenter ? horizontalCenter : Math.round(left),
      top: Math.round(top),
    },
    bottomLeft: {
      left: arrowAtCenter ? horizontalCenter : Math.round(right),
      top: Math.round(bottom),
    },
    bottomCenter: {
      left: horizontalCenter,
      top: Math.round(bottom),
    },
    bottomRight: {
      left: arrowAtCenter ? horizontalCenter : Math.round(left),
      top: Math.round(bottom),
    },
    leftTop: {
      left: Math.round(left),
      top: Math.round(top + (bottom - top) / 2),
    },
    rightTop: {
      left: Math.round(right),
      top: Math.round(top + (bottom - top) / 2),
    },
    // Variation of the sides not done yet...
    leftBottom: {
      left: Math.round(left),
      top: Math.round(top + (bottom - top) / 2),
    },
    rightBottom: {
      left: Math.round(right),
      top: Math.round(top + (bottom - top) / 2),
    },
  };
}
