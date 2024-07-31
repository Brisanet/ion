import { IonTourStepPositions } from '../core/types';
import { GetPositionsCallbackProps } from '../position/position.service';

type TourPopoverPositions = {
  [key in IonTourStepPositions]: Pick<DOMRect, 'left' | 'top'>;
};

export function generatePositionCallback(
  contentPadding: number,
  marginToContent: number
): (props: GetPositionsCallbackProps) => TourPopoverPositions {
  return (props) => getPositionsPopover(props, contentPadding, marginToContent);
}

export function getPositionsPopover(
  props: GetPositionsCallbackProps,
  contentPadding: number,
  marginToContent: number
): TourPopoverPositions {
  const { host: rawHost, element: popover } = props;

  const hostHorizontalCenter = Math.round(rawHost.width / 2 + rawHost.left);
  const hostVerticalCenter = Math.round(rawHost.height / 2 + rawHost.top);

  const host = {
    top: rawHost.top - contentPadding,
    bottom: rawHost.bottom + contentPadding,
    left: rawHost.left - contentPadding,
    right: rawHost.right + contentPadding,
    width: rawHost.width + contentPadding * 2,
    height: rawHost.height + contentPadding * 2,
  };

  return {
    topRight: {
      top: host.top - popover.height - marginToContent,
      left: host.right - popover.width,
    },
    topCenter: {
      top: host.top - popover.height - marginToContent,
      left: hostHorizontalCenter - popover.width / 2,
    },
    topLeft: {
      top: host.top - popover.height - marginToContent,
      left: host.left,
    },
    bottomRight: {
      top: host.bottom + marginToContent,
      left: host.right - popover.width,
    },
    bottomCenter: {
      top: host.bottom + marginToContent,
      left: hostHorizontalCenter - popover.width / 2,
    },
    bottomLeft: {
      top: host.bottom + marginToContent,
      left: host.left,
    },
    leftBottom: {
      left: host.left - popover.width - marginToContent,
      top: host.bottom - popover.height,
    },
    leftCenter: {
      left: host.left - popover.width - marginToContent,
      top: hostVerticalCenter - popover.height / 2,
    },
    leftTop: {
      left: host.left - popover.width - marginToContent,
      top: host.top,
    },
    rightBottom: {
      left: host.right + marginToContent,
      top: host.bottom - popover.height,
    },
    rightCenter: {
      left: host.right + marginToContent,
      top: hostVerticalCenter - popover.height / 2,
    },
    rightTop: {
      left: host.right + marginToContent,
      top: host.top,
    },
  };
}
