import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum Positions {
  TOP_RIGHT = 'topRight',
  TOP_CENTER = 'topCenter',
  TOP_LEFT = 'topLeft',
  RIGHT_TOP = 'rightTop',
  RIGHT_CENTER = 'rightCenter',
  RIGHT_BOTTOM = 'rightBottom',
  LEFT_TOP = 'leftTop',
  LEFT_CENTER = 'leftCenter',
  LEFT_BOTTOM = 'leftBottom',
  BOTTOM_RIGHT = 'bottomRight',
  BOTTOM_CENTER = 'bottomCenter',
  BOTTOM_LEFT = 'bottomLeft',
}

export type RepositionData = {
  componentCoordinates: Partial<DOMRect>;
  hostPosition: Partial<DOMRect>;
  screenWidth: number;
  screenHeight: number;
};

export type PositionsChecks<T = Positions> = {
  [x in keyof T]?: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class IonPositionService<T = Positions> {
  public readonly reposition = new Subject();
  private hostPosition: Partial<DOMRect>;
  private componentCoordinates: DOMRect;
  private elementPadding = 0;
  private currentPosition: keyof T;

  public setHostPosition(position: Partial<DOMRect>): void {
    this.hostPosition = position;
  }

  public setcomponentCoordinates(coordinates: DOMRect): void {
    this.componentCoordinates = coordinates;
  }

  public setCurrentPosition(position: unknown): void {
    this.currentPosition = position as keyof T;
  }

  public getNewPosition(): keyof T {
    const { clientWidth, clientHeight } = document.body;

    if (!this.hostPosition) {
      return;
    }

    const repositionData: RepositionData = {
      componentCoordinates: this.componentCoordinates,
      hostPosition: this.hostPosition,
      screenWidth: clientWidth,
      screenHeight: clientHeight,
    };
    const positions = this.getPositions(repositionData);

    return this.checkPositions(positions);
  }

  public checkPositions(
    positions: PositionsChecks<T>
  ): keyof PositionsChecks<T> {
    let newPosition = this.currentPosition;

    if (!positions[newPosition as keyof PositionsChecks<T>]) {
      Object.entries(positions).forEach(([position, check]) => {
        if (check) {
          return (newPosition = position as keyof T);
        }
      });
    }

    return newPosition;
  }

  public getPositions(respositionData: RepositionData): PositionsChecks<T> {
    const { height, width } = respositionData.componentCoordinates;

    const positions = {
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
      left: this.atLeftEdge(respositionData.hostPosition.left, width),
      top: this.atTopEdge(respositionData.hostPosition.top, height),
    };

    return {
      rightTop: !positions.right && !positions.top,
      rightCenter: !positions.right && !positions.bottom && !positions.top,
      rightBottom: !positions.right && !positions.bottom,
      leftTop: !positions.left && !positions.top,
      leftCenter: !positions.left && !positions.bottom && !positions.top,
      leftBottom: !positions.left && !positions.bottom,
      bottomLeft: !positions.bottom && !positions.left,
      bottomCenter: !positions.bottom && !positions.left && !positions.right,
      bottomRight: !positions.bottom && !positions.right,
      topLeft: !positions.top && !positions.left,
      topCenter: !positions.top && !positions.left && !positions.right,
      topRight: !positions.top && !positions.right,
    } as unknown as PositionsChecks<T>;
  }

  public emitReposition(): void {
    this.reposition.next();
  }

  private atRightEdge(
    screenWidth: number,
    hostRight: number,
    componentWidth: number
  ): boolean {
    return screenWidth - hostRight < (componentWidth + this.elementPadding) / 2;
  }

  private atBottomEdge(
    screenHeight: number,
    hostBottom: number,
    componentHeight: number
  ): boolean {
    return (
      screenHeight - hostBottom < (componentHeight + this.elementPadding) / 2
    );
  }

  private atLeftEdge(hostLeft: number, componentWidth: number): boolean {
    return hostLeft - (componentWidth + this.elementPadding) / 2 < 0;
  }

  private atTopEdge(hostTop: number, componentHeight: number): boolean {
    return hostTop < (componentHeight + this.elementPadding) / 2;
  }
}
