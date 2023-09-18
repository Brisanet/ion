import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TooltipPosition } from '../core/types';

export type RepositionData = {
  tooltipCoordinates: Partial<DOMRect>;
  hostPosition: Partial<DOMRect>;
  screenWidth: number;
  screenHeight: number;
};

export type tooltipPositionChecks = {
  [x in TooltipPosition]?: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TooltipService {
  public readonly reposition = new Subject();
  private hostPosition: Partial<DOMRect>;
  private tootipCoordinates: DOMRect;
  private elementPadding = 16;
  private currentPosition: TooltipPosition;

  public setHostPosition(position: Partial<DOMRect>): void {
    this.hostPosition = position;
  }

  public setTooltipCoordinates(coordinates: DOMRect): void {
    this.tootipCoordinates = coordinates;
  }

  public setCurrentPosition(position: TooltipPosition): void {
    this.currentPosition = position;
  }

  public getNewPosition(): TooltipPosition {
    const { clientWidth, clientHeight } = document.body;

    if (!this.hostPosition) {
      return;
    }

    const repositionData: RepositionData = {
      tooltipCoordinates: this.tootipCoordinates,
      hostPosition: this.hostPosition,
      screenWidth: clientWidth,
      screenHeight: clientHeight,
    };
    const positions: tooltipPositionChecks =
      this.getTooltipPositions(repositionData);

    return this.checkPositions(positions);
  }

  public checkPositions(positions: tooltipPositionChecks): TooltipPosition {
    let newPosition = this.currentPosition;

    Object.entries(positions).forEach(([position, check]) => {
      if (check) {
        newPosition = position as TooltipPosition;
      }
    });

    return newPosition;
  }

  public getTooltipPositions(
    respositionData: RepositionData
  ): tooltipPositionChecks {
    const { height, left, width } = respositionData.tooltipCoordinates;

    const tooltipPositions = {
      right: this.atRightEdge(
        respositionData.screenWidth,
        respositionData.hostPosition.right,
        width
      ),
      bottom: this.atBottomEdge(
        respositionData.screenHeight,
        respositionData.hostPosition.bottom,
        height
      ),
      left: this.atLeftEdge(left, width),
      top: this.atTopEdge(respositionData.hostPosition.top, height),
    };

    return {
      centerRight: tooltipPositions.right,
      bottomCenter: tooltipPositions.bottom,
      centerLeft: tooltipPositions.left,
      topRight: tooltipPositions.top && tooltipPositions.right,
      bottomLeft: tooltipPositions.bottom && tooltipPositions.left,
      topLeft: tooltipPositions.top && tooltipPositions.left,
      bottomRight: tooltipPositions.bottom && tooltipPositions.right,
    };
  }

  public emitReposition(): void {
    this.reposition.next();
  }

  private atRightEdge(
    screenWidth: number,
    hostRight: number,
    tooltipWidth: number
  ): boolean {
    return screenWidth - hostRight < (tooltipWidth + this.elementPadding) / 2;
  }

  private atBottomEdge(
    screenHeight: number,
    hostBottom: number,
    tooltipHeight: number
  ): boolean {
    return screenHeight - hostBottom < tooltipHeight + this.elementPadding;
  }

  private atLeftEdge(tooltipLeft: number, tooltipWidth: number): boolean {
    return tooltipLeft < (tooltipWidth + this.elementPadding) / 2;
  }

  private atTopEdge(hostTop: number, tooltipHeight: number): boolean {
    return hostTop < (tooltipHeight + this.elementPadding) / 2;
  }
}
