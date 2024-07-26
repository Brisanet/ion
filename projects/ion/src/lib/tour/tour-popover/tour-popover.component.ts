import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import { isString } from 'lodash';

import { IonTourPopoverProps } from '../../core/types/tour';
import {
  IonPositionService,
  NewPosition,
} from '../../position/position.service';
import { generatePositionCallback } from '../tour-position.calculator';
import { IonTourService } from '../tour.service';

@Component({
  selector: 'ion-tour-popover',
  templateUrl: './tour-popover.component.html',
  styleUrls: ['./tour-popover.component.scss'],
})
export class IonTourPopoverComponent implements AfterViewChecked {
  @Input() public step?: IonTourPopoverProps;

  public top = 0;
  public left = 0;
  public isActive = false;
  public isString = isString;

  constructor(
    private readonly tourService: IonTourService,
    private readonly positionService: IonPositionService,
    private readonly elementRef: ElementRef,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public next(): void {
    this.tourService.nextStep();
    this.step!.ionOnNextStep.emit();
  }

  public prev(): void {
    this.tourService.prevStep();
    this.step!.ionOnPrevStep.emit();
  }

  public finish(): void {
    this.tourService.finish();
    this.step!.ionOnFinishTour.emit();
  }

  public ngAfterViewChecked(): void {
    this.repositionPopover();
  }

  private repositionPopover(): void {
    const currentStep = this.tourService.currentStep.value;
    this.isActive =
      !!this.step &&
      !!currentStep &&
      currentStep.ionStepId === this.step.ionStepId;

    if (this.step && this.elementRef.nativeElement.children.length) {
      const newPosition = this.getNewPosition();
      this.top = newPosition.top + window.scrollY;
      this.left = newPosition.left + window.scrollX;
      this.cdr.detectChanges();
    }
  }

  private getNewPosition(): NewPosition {
    const {
      target,
      ionStepPosition,
      ionStepMarginToContent,
      ionStepBackdropPadding,
    } = this.step!;

    this.positionService.setHostPosition(target);
    this.positionService.setChoosedPosition(ionStepPosition);
    this.positionService.setElementPadding(ionStepMarginToContent!);
    this.positionService.setcomponentCoordinates(
      this.elementRef.nativeElement.children[0].getBoundingClientRect()
    );

    return this.positionService.getNewPosition(
      generatePositionCallback(ionStepBackdropPadding!, ionStepMarginToContent!)
    );
  }
}
