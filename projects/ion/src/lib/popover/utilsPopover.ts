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
  const verticalCenter = Math.round((bottom - top) / 2 + bottom);
  return {
    topLeft: {
      left: arrowAtCenter ? horizontalCenter : Math.round(right),
      top: Math.round(top - (bottom - top) / 2),
    },
    topCenter: {
      left: horizontalCenter,
      top: Math.round(top - (bottom - top) / 2),
    },
    topRight: {
      left: arrowAtCenter ? horizontalCenter : Math.round(left),
      top: Math.round(top - (bottom - top) / 2),
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
      top: Math.round(top - (bottom - top)),
    },
    rightTop: {
      left: Math.round(right),
      top: Math.round(top - (bottom - top)),
    },
    leftBottom: {
      left: Math.round(left),
      top: arrowAtCenter
        ? verticalCenter
        : Math.round((bottom - top) / 2 + bottom),
    },
    rightBottom: {
      left: Math.round(right),
      top: arrowAtCenter
        ? verticalCenter
        : Math.round((bottom - top) / 2 + bottom),
    },
  };
}
