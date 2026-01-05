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
  private hostPosition: Partial<DOMRect> = {};
  private tootipCoordinates: DOMRect | null = null;
  private elementPadding = 16;
  private currentPosition: TooltipPosition = TooltipPosition.DEFAULT;

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
      return TooltipPosition.DEFAULT;
    }

    const repositionData: RepositionData = {
      tooltipCoordinates: this.tootipCoordinates || {},
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

    if (positions[newPosition]) {
      return newPosition;
    }

    Object.entries(positions).forEach(([position, check]) => {
      if (check) {
        newPosition = position as TooltipPosition;
      }
    });
    return newPosition;
  }

  public getTooltipPositions(
    respositionData: RepositionData,
  ): tooltipPositionChecks {
    const {
      height = 0,
      left = 0,
      width = 0,
    } = respositionData.tooltipCoordinates;

    const tooltipPositions = {
      right: this.atRightEdge(
        respositionData.screenWidth,
        respositionData.hostPosition.right || 0,
        width,
      ),
      bottom: this.atBottomEdge(
        respositionData.screenHeight,
        respositionData.hostPosition.bottom || 0,
        height,
      ),
      left: this.atLeftEdge(left, width),
      top: this.atTopEdge(respositionData.hostPosition.top || 0, height),
    };

    return {
      centerRight:
        !tooltipPositions.left &&
        !tooltipPositions.bottom &&
        !tooltipPositions.top,
      bottomCenter:
        !tooltipPositions.top &&
        !tooltipPositions.left &&
        !tooltipPositions.right,
      centerLeft:
        !tooltipPositions.right &&
        !tooltipPositions.bottom &&
        !tooltipPositions.top,
      topRight: !tooltipPositions.bottom && !tooltipPositions.left,
      bottomLeft: !tooltipPositions.top && !tooltipPositions.right,
      topLeft: !tooltipPositions.bottom && !tooltipPositions.right,
      bottomRight: !tooltipPositions.top && !tooltipPositions.left,
      topCenter:
        !tooltipPositions.bottom &&
        !tooltipPositions.left &&
        !tooltipPositions.right,
    };
  }

  public emitReposition(): void {
    this.reposition.next(undefined);
  }

  private atRightEdge(
    screenWidth: number,
    hostRight: number,
    tooltipWidth: number,
  ): boolean {
    return screenWidth - hostRight < (tooltipWidth + this.elementPadding) / 2;
  }

  private atBottomEdge(
    screenHeight: number,
    hostBottom: number,
    tooltipHeight: number,
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
