import { PopoverPosition } from '../core/types/popover';
import { GetPositionsCallbackProps } from '../position/position.service';

export type PopoverPositions = {
  [key in PopoverPosition]: Pick<DOMRect, 'left' | 'top'>;
};

const distanciaDaFlechaAteABorda = 16;
const arrowVisibleDiagonal = 18;
const arrowMargin = 3;

export function getPositionsPopover(
  props: GetPositionsCallbackProps
): PopoverPositions {
  const { host, arrowAtCenter, element: popover } = props;
  const hostHorizontalCenter = Math.round(host.width / 2 + host.left);
  const hostVerticalCenter = Math.round(host.height / 2 + host.top);

  return {
    topLeft: {
      left: arrowAtCenter
        ? hostHorizontalCenter -
          popover.width +
          arrowVisibleDiagonal / 2 +
          distanciaDaFlechaAteABorda +
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
          distanciaDaFlechaAteABorda -
          arrowVisibleDiagonal / 2 +
          arrowMargin
        : host.left,
      top: host.top,
    },
    bottomLeft: {
      left: arrowAtCenter
        ? hostHorizontalCenter -
          popover.width +
          arrowVisibleDiagonal / 2 +
          distanciaDaFlechaAteABorda +
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
          distanciaDaFlechaAteABorda -
          arrowVisibleDiagonal / 2 +
          arrowMargin
        : host.left,
      top: host.bottom,
    },
    leftTop: {
      left: host.left - popover.width,
      top: arrowAtCenter
        ? hostVerticalCenter +
          distanciaDaFlechaAteABorda +
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
          distanciaDaFlechaAteABorda -
          arrowVisibleDiagonal / 2 +
          arrowMargin
        : host.top,
    },
    rightTop: {
      left: host.right,
      top: arrowAtCenter
        ? hostVerticalCenter +
          distanciaDaFlechaAteABorda +
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
          distanciaDaFlechaAteABorda -
          arrowVisibleDiagonal / 2 +
          arrowMargin
        : host.top,
    },
  };
}
