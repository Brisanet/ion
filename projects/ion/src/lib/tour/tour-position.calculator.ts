import { PopoverPosition } from '../core/types';
import { GetPositionsCallbackProps } from '../position/position.service';

type PopoverPositions = {
  [key in PopoverPosition]: Pick<DOMRect, 'left' | 'top'>;
};

type GetPositionsCallback = (
  props: GetPositionsCallbackProps
) => PopoverPositions;

interface PositionParams {
  host: DOMRect;
  popover: DOMRect;
  arrowAtCenter: boolean;
  hostHorizontalCenter: number;
  hostVerticalCenter: number;
  marginToContent: number;
}

export function generatePositionCallback(
  contentPadding: number,
  marginToContent: number
): GetPositionsCallback {
  return (props) => getPositionsPopover(props, contentPadding, marginToContent);
}

export function getPositionsPopover(
  props: GetPositionsCallbackProps,
  contentPadding: number,
  marginToContent: number
): PopoverPositions {
  const { host, element: popover } = props;
  const hostHorizontalCenter = Math.round(host.width / 2 + host.left);
  const hostVerticalCenter = Math.round(host.height / 2 + host.top);
  const calculatePositionProps = {
    host: {
      top: host.top - contentPadding,
      bottom: host.bottom + contentPadding,
      left: host.left - contentPadding,
      right: host.right + contentPadding,
      width: host.width + contentPadding * 2,
      height: host.height + contentPadding * 2,
    },
    popover,
    hostHorizontalCenter,
    hostVerticalCenter,
    marginToContent,
  } as PositionParams;

  return {
    ...calculateTopPositions(calculatePositionProps),
    ...calculateBottomPositions(calculatePositionProps),
    ...calculateLeftPositions(calculatePositionProps),
    ...calculateRightPositions(calculatePositionProps),
  } as PopoverPositions;
}

function calculateTopPositions({
  host,
  popover,
  marginToContent,
  hostHorizontalCenter,
}: PositionParams): Partial<PopoverPositions> {
  const top = host.top - popover.height - marginToContent;
  return {
    topRight: { left: host.right - popover.width, top },
    topCenter: { left: hostHorizontalCenter - popover.width / 2, top },
    topLeft: { left: host.left, top },
  };
}

function calculateBottomPositions({
  host,
  popover,
  marginToContent,
  hostHorizontalCenter,
}: PositionParams): Partial<PopoverPositions> {
  const top = host.bottom + marginToContent;
  return {
    bottomRight: { left: host.right - popover.width, top },
    bottomCenter: { left: hostHorizontalCenter - popover.width / 2, top },
    bottomLeft: { left: host.left, top },
  };
}

function calculateLeftPositions({
  host,
  popover,
  marginToContent,
  hostVerticalCenter,
}: PositionParams): Partial<PopoverPositions> {
  const left = host.left - popover.width - marginToContent;
  return {
    leftBottom: { left, top: host.bottom - popover.height },
    leftCenter: { left, top: hostVerticalCenter - popover.height / 2 },
    leftTop: { left, top: host.top },
  };
}

function calculateRightPositions({
  host,
  popover,
  marginToContent,
  hostVerticalCenter,
}: PositionParams): Partial<PopoverPositions> {
  const left = host.right + marginToContent;
  return {
    rightBottom: { left, top: host.bottom - popover.height },
    rightCenter: { left, top: hostVerticalCenter - popover.height / 2 },
    rightTop: { left, top: host.top },
  };
}
