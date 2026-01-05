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
  const top = host.top;
  return {
    topRight: {
      left: arrowAtCenter
        ? hostHorizontalCenter -
          popover.width +
          arrowVisibleDiagonal / 2 +
          arrowToEdgeDistance +
          arrowMargin
        : host.right - popover.width,
      top,
    },
    topCenter: {
      left: hostHorizontalCenter - popover.width / 2,
      top,
    },
    topLeft: {
      left: arrowAtCenter
        ? hostHorizontalCenter -
          arrowToEdgeDistance -
          arrowVisibleDiagonal / 2 +
          arrowMargin
        : host.left,
      top,
    },
  };
}

function calculateBottomPositions({
  host,
  popover,
  arrowAtCenter,
  hostHorizontalCenter,
}: PositionParams): Partial<PopoverPositions> {
  const top = host.bottom;
  return {
    bottomRight: {
      left: arrowAtCenter
        ? hostHorizontalCenter -
          popover.width +
          arrowVisibleDiagonal / 2 +
          arrowToEdgeDistance +
          arrowMargin
        : host.right - popover.width,
      top,
    },
    bottomCenter: {
      left: hostHorizontalCenter - popover.width / 2,
      top,
    },
    bottomLeft: {
      left: arrowAtCenter
        ? hostHorizontalCenter -
          arrowToEdgeDistance -
          arrowVisibleDiagonal / 2 +
          arrowMargin
        : host.left,
      top,
    },
  };
}

function calculateLeftPositions({
  host,
  popover,
  arrowAtCenter,
  hostVerticalCenter,
}: PositionParams): Partial<PopoverPositions> {
  const left = host.left - popover.width;
  return {
    leftBottom: {
      left,
      top: arrowAtCenter
        ? hostVerticalCenter +
          arrowToEdgeDistance +
          arrowVisibleDiagonal / 2 -
          arrowMargin
        : host.bottom,
    },
    leftCenter: {
      left,
      top: hostVerticalCenter,
    },
    leftTop: {
      left,
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
  const left = host.right;
  return {
    rightBottom: {
      left,
      top: arrowAtCenter
        ? hostVerticalCenter +
          arrowToEdgeDistance +
          arrowVisibleDiagonal / 2 -
          arrowMargin
        : host.bottom,
    },
    rightCenter: {
      left,
      top: hostVerticalCenter,
    },
    rightTop: {
      left,
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
  props: GetPositionsCallbackProps,
): PopoverPositions {
  const { host, arrowAtCenter, element: popover } = props;
  const hostHorizontalCenter = Math.round(host.width / 2 + host.left);
  const hostVerticalCenter = Math.round(host.height / 2 + host.top);
  const calculatePositionProps = {
    host,
    popover,
    arrowAtCenter,
    hostHorizontalCenter,
    hostVerticalCenter,
  };

  return {
    ...calculateTopPositions(calculatePositionProps),
    ...calculateBottomPositions(calculatePositionProps),
    ...calculateLeftPositions(calculatePositionProps),
    ...calculateRightPositions(calculatePositionProps),
  } as PopoverPositions;
}
