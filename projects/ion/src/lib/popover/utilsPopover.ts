import { PopoverPosition } from '../core/types/popover';

export type PopoverPositions = {
  [key in PopoverPosition]: Pick<DOMRect, 'left' | 'top'>;
};

const distanciaDaFlechaAteABorda = 16;
const arrowVisibleDiagonal = 18;
const arrowMargin = 3;

export function getPositionsPopover(
  host: DOMRect,
  arrowAtCenter: boolean,
  popover: HTMLElement
): PopoverPositions {
  const hostHorizontalCenter = Math.round(host.width / 2 + host.left);
  const hostVerticalCenter = Math.round(host.height / 2 + host.top);

  const { offsetWidth: popoverWidth } = popover;

  return {
    topLeft: {
      left: arrowAtCenter
        ? hostHorizontalCenter -
          popoverWidth +
          arrowVisibleDiagonal / 2 +
          distanciaDaFlechaAteABorda +
          arrowMargin
        : host.right - popoverWidth,
      top: host.top,
    },
    topCenter: {
      left: hostHorizontalCenter - popoverWidth / 2,
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
          popoverWidth +
          arrowVisibleDiagonal / 2 +
          distanciaDaFlechaAteABorda +
          arrowMargin
        : host.right - popoverWidth,
      top: host.bottom,
    },
    bottomCenter: {
      left: hostHorizontalCenter - popoverWidth / 2,
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
      left: host.left - popoverWidth,
      top: arrowAtCenter
        ? hostVerticalCenter +
          distanciaDaFlechaAteABorda +
          arrowVisibleDiagonal / 2 -
          arrowMargin
        : host.bottom,
    },
    leftCenter: {
      left: host.left - popoverWidth,
      top: hostVerticalCenter,
    },
    leftBottom: {
      left: host.left - popoverWidth,
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
