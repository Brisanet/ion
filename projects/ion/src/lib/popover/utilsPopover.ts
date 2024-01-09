import { PopoverPosition } from '../core/types/popover';
import { GetPositionsCallbackProps } from '../position/position.service';

export type PopoverPositions = {
  [key in PopoverPosition]: Pick<DOMRect, 'left' | 'top'>;
};

const arrowToEdgeDistance = 16;
const arrowVisibleDiagonal = 18;
const arrowMargin = 3;

interface PositionParams {
  host: DOMRect;
  popover?: DOMRect;
  arrowAtCenter: boolean;
  hostHorizontalCenter?: number;
  hostVerticalCenter?: number;
}

function calculateTopPositions({
  host,
  popover,
  arrowAtCenter,
  hostHorizontalCenter,
}: PositionParams): Partial<PopoverPositions> {
  return {
    topLeft: {
      left: arrowAtCenter
        ? hostHorizontalCenter -
          popover.width +
          arrowVisibleDiagonal / 2 +
          arrowToEdgeDistance +
          arrowMargin
        : host.right - popover.width,
      top: host.top,
    },
    topCenter: {
      left: hostHorizontalCenter - popover.width / 2,
      top: host.top,
    },
    topRight: {
      left: arrowAtCenter
        ? hostHorizontalCenter -
          arrowToEdgeDistance -
          arrowVisibleDiagonal / 2 +
          arrowMargin
        : host.left,
      top: host.top,
    },
  };
}

function calculateBottomPositions({
  host,
  popover,
  arrowAtCenter,
  hostHorizontalCenter,
}: PositionParams): Partial<PopoverPositions> {
  return {
    bottomLeft: {
      left: arrowAtCenter
        ? hostHorizontalCenter -
          popover.width +
          arrowVisibleDiagonal / 2 +
          arrowToEdgeDistance +
          arrowMargin
        : host.right - popover.width,
      top: host.bottom,
    },
    bottomCenter: {
      left: hostHorizontalCenter - popover.width / 2,
      top: host.bottom,
    },
    bottomRight: {
      left: arrowAtCenter
        ? hostHorizontalCenter -
          arrowToEdgeDistance -
          arrowVisibleDiagonal / 2 +
          arrowMargin
        : host.left,
      top: host.bottom,
    },
  };
}

function calculateLeftPositions({
  host,
  popover,
  arrowAtCenter,
  hostVerticalCenter,
}: PositionParams): Partial<PopoverPositions> {
  return {
    leftTop: {
      left: host.left - popover.width,
      top: arrowAtCenter
        ? hostVerticalCenter +
          arrowToEdgeDistance +
          arrowVisibleDiagonal / 2 -
          arrowMargin
        : host.bottom,
    },
    leftCenter: {
      left: host.left - popover.width,
      top: hostVerticalCenter,
    },
    leftBottom: {
      left: host.left - popover.width,
      top: arrowAtCenter
        ? hostVerticalCenter -
          arrowToEdgeDistance -
          arrowVisibleDiagonal / 2 +
          arrowMargin
        : host.top,
    },
  };
}

function calculateRightPositions({
  host,
  arrowAtCenter,
  hostVerticalCenter,
}: PositionParams): Partial<PopoverPositions> {
  return {
    rightTop: {
      left: host.right,
      top: arrowAtCenter
        ? hostVerticalCenter +
          arrowToEdgeDistance +
          arrowVisibleDiagonal / 2 -
          arrowMargin
        : host.bottom,
    },
    rightCenter: {
      left: host.right,
      top: hostVerticalCenter,
    },
    rightBottom: {
      left: host.right,
      top: arrowAtCenter
        ? hostVerticalCenter -
          arrowToEdgeDistance -
          arrowVisibleDiagonal / 2 +
          arrowMargin
        : host.top,
    },
  };
}

export function getPositionsPopover(
  props: GetPositionsCallbackProps
): PopoverPositions {
  const { host, arrowAtCenter, element: popover } = props;
  const hostHorizontalCenter = Math.round(host.width / 2 + host.left);
  const hostVerticalCenter = Math.round(host.height / 2 + host.top);

  return {
    ...calculateTopPositions({
      host,
      popover,
      arrowAtCenter,
      hostHorizontalCenter,
    }),
    ...calculateBottomPositions({
      host,
      popover,
      arrowAtCenter,
      hostHorizontalCenter,
    }),
    ...calculateLeftPositions({
      host,
      popover,
      arrowAtCenter,
      hostVerticalCenter,
    }),
    ...calculateRightPositions({ host, arrowAtCenter, hostVerticalCenter }),
  } as PopoverPositions;
}
