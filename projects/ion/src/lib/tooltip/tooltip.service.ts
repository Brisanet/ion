import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TooltipPosition } from '../core/types';

export type RepositionData = {
  tooltipLeft: number;
  tooltipHeight: number;
  hostPosition: Partial<DOMRect>;
  screenWidth: number;
  screenHeight: number;
};

export type tooltipPositionChecks = {
  [x in TooltipPosition]?: () => boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TooltipService {
  reposition = new Subject();
  hostPosition: Partial<DOMRect>;
  screenSize: HTMLElement;
  tootipCoordinates: DOMRect;
  elementPadding = 16;
  elementMaxWidth = 208 + this.elementPadding;

  public getNewPosition(): TooltipPosition {
    const { left, height } = this.tootipCoordinates;
    const { clientWidth, clientHeight } = this.screenSize;

    if (!this.hostPosition) {
      return;
    }

    const repositionData: RepositionData = {
      tooltipLeft: left,
      tooltipHeight: height,
      hostPosition: this.hostPosition,
      screenWidth: clientWidth,
      screenHeight: clientHeight,
    };
    const positions: tooltipPositionChecks =
      this.getTooltipPositions(repositionData);

    const newPosition = this.checkPositions(positions);

    return newPosition;
  }

  public checkPositions(positions: tooltipPositionChecks): TooltipPosition {
    let newPosition = TooltipPosition.DEFAULT;

    Object.entries(positions).forEach(([position, check]) => {
      if (check()) {
        newPosition = position as TooltipPosition;
      }
    });

    return newPosition;
  }

  public getTooltipPositions(
    respositionData: RepositionData
  ): tooltipPositionChecks {
    return {
      centerRight: () =>
        this.atRightEdge(
          respositionData.screenWidth,
          respositionData.hostPosition.right
        ),
      bottomCenter: () =>
        this.atBottomEdge(
          respositionData.screenHeight,
          respositionData.hostPosition.bottom,
          respositionData.tooltipHeight
        ),
      centerLeft: () => this.atLeftEdge(respositionData.tooltipLeft),
      topRight: () =>
        this.atTopEdge(
          respositionData.hostPosition.top,
          respositionData.tooltipHeight
        ) &&
        this.atRightEdge(
          respositionData.screenWidth,
          respositionData.hostPosition.right
        ),
      bottomLeft: () =>
        this.atBottomEdge(
          respositionData.screenHeight,
          respositionData.hostPosition.bottom,
          respositionData.tooltipHeight
        ) && this.atLeftEdge(respositionData.tooltipLeft),
      topLeft: () =>
        this.atTopEdge(
          respositionData.hostPosition.top,
          respositionData.screenHeight
        ) && this.atLeftEdge(respositionData.tooltipLeft),
      bottomRight: () =>
        this.atBottomEdge(
          respositionData.screenHeight,
          respositionData.hostPosition.bottom,
          respositionData.tooltipHeight
        ) &&
        this.atRightEdge(
          respositionData.screenWidth,
          respositionData.hostPosition.right
        ),
    };
  }

  private atRightEdge(screenWidth: number, hostRight: number): boolean {
    return screenWidth - hostRight < this.elementMaxWidth / 2;
  }

  private atBottomEdge(
    screenHeight: number,
    hostBottom: number,
    height: number
  ): boolean {
    return screenHeight - hostBottom < height + this.elementPadding;
  }

  private atLeftEdge(left: number): boolean {
    return left < this.elementMaxWidth / 2;
  }

  private atTopEdge(hostTop: number, height: number): boolean {
    return hostTop < (height + this.elementPadding) / 2;
  }
}
