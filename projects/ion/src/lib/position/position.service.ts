import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum IonPositions {
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

export type ElementPositions = {
  [key in IonPositions]: Pick<DOMRect, 'left' | 'top'>;
};

export type NewPosition = { key: IonPositions } & Pick<DOMRect, 'left' | 'top'>;

export type GetPositionsCallback = (
  props: GetPositionsCallbackProps
) => ElementPositions;

export interface GetPositionsCallbackProps {
  host: DOMRect;
  element: DOMRect;
  arrowAtCenter: boolean;
}

export type RepositionData = {
  componentCoordinates: Partial<DOMRect>;
  hostPosition: Partial<DOMRect>;
  screenWidth: number;
  screenHeight: number;
};

export type PositionsChecks = {
  [x in IonPositions]?: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class IonPositionService {
  public readonly reposition = new Subject();
  private hostPosition!: DOMRect;
  private componentCoordinates!: DOMRect;
  private elementPadding = 0;
  private choosedPosition!: IonPositions;
  private currentPosition!: IonPositions;
  private pointAtCenter = true;
  private autoReposition = true;

  public setElementPadding(padding: number): void {
    this.elementPadding = padding;
  }

  public setHostPosition(position: DOMRect): void {
    this.hostPosition = position;
  }

  public setcomponentCoordinates(coordinates: DOMRect): void {
    this.componentCoordinates = coordinates;
  }

  public setChoosedPosition(position: unknown): void {
    this.choosedPosition = position as IonPositions;
  }

  public getCurrentPosition(): unknown {
    return this.currentPosition || this.choosedPosition;
  }

  public setPointAtCenter(value: boolean): void {
    this.pointAtCenter = value;
  }

  public setAutoReposition(value: boolean): void {
    this.autoReposition = value;
  }

  public getNewPosition(
    getPositionCallback: GetPositionsCallback
  ): NewPosition {
    if (!this.hostPosition) {
      return { key: this.choosedPosition, left: 0, top: 0 };
    }

    const availablePositions = getPositionCallback({
      host: this.hostPosition,
      arrowAtCenter: this.pointAtCenter,
      element: this.componentCoordinates,
    });

    this.currentPosition = this.checkPositions(availablePositions);
    return {
      key: this.currentPosition,
      ...availablePositions[this.currentPosition as keyof ElementPositions],
    };
  }

  public checkPositions(
    availablePositions: ElementPositions
  ): keyof PositionsChecks {
    if (!this.autoReposition) {
      return this.choosedPosition;
    }
    const positions = this.getPositions();

    let newPosition = this.choosedPosition;

    if (!positions[newPosition as keyof PositionsChecks]) {
      const foundPosition = Object.entries(positions).find(([position, check]) =>
        check && !!availablePositions[position as keyof ElementPositions]
      );
      if (foundPosition) {
        newPosition = foundPosition[0] as IonPositions;
      }
    }

    return newPosition;
  }

  public getPositions(): PositionsChecks {
    const { clientWidth, clientHeight } = document.body;
    const { width, height } = this.componentCoordinates;

    const positions = {
      right: this.atRightEdge(clientWidth, this.hostPosition.right, width),
      bottom: this.atBottomEdge(clientHeight, this.hostPosition.bottom, height),
      left: this.atLeftEdge(this.hostPosition.left, width),
      top: this.atTopEdge(this.hostPosition.top, height),
    };

    return {
      rightBottom: !positions.right && !positions.top,
      rightCenter: !positions.right && !positions.bottom && !positions.top,
      rightTop: !positions.right && !positions.bottom,
      leftBottom: !positions.left && !positions.top,
      leftCenter: !positions.left && !positions.bottom && !positions.top,
      leftTop: !positions.left && !positions.bottom,
      bottomRight: !positions.bottom && !positions.left,
      bottomCenter: !positions.bottom && !positions.left && !positions.right,
      bottomLeft: !positions.bottom && !positions.right,
      topRight: !positions.top && !positions.left,
      topCenter: !positions.top && !positions.left && !positions.right,
      topLeft: !positions.top && !positions.right,
    };
  }

  public emitReposition(): void {
    this.reposition.next(undefined);
  }

  private atRightEdge(
    screenWidth: number,
    hostRight: number,
    componentWidth: number
  ): boolean {
    return screenWidth - hostRight < componentWidth + this.elementPadding;
  }

  private atBottomEdge(
    screenHeight: number,
    hostBottom: number,
    componentHeight: number
  ): boolean {
    return screenHeight - hostBottom < componentHeight + this.elementPadding;
  }

  private atLeftEdge(hostLeft: number, componentWidth: number): boolean {
    return hostLeft - componentWidth - this.elementPadding < 0;
  }

  private atTopEdge(hostTop: number, componentHeight: number): boolean {
    return hostTop < componentHeight + this.elementPadding;
  }
}
