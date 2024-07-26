import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
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
export class IonTourPopoverComponent
  implements AfterViewChecked, OnChanges, IonTourPopoverProps
{
  @Input() public target: IonTourPopoverProps['target'];
  @Input() public ionStepId: IonTourPopoverProps['ionStepId'];
  @Input() public ionTourId: IonTourPopoverProps['ionTourId'];
  @Input() public ionStepTitle?: IonTourPopoverProps['ionStepTitle'];
  @Input() public ionStepContent?: IonTourPopoverProps['ionStepContent'];
  @Input()
  public ionStepPrevBtnTitle?: IonTourPopoverProps['ionStepPrevBtnTitle'];
  @Input()
  public ionStepNextBtnTitle?: IonTourPopoverProps['ionStepNextBtnTitle'];
  @Input()
  public ionStepFinishBtnTitle?: IonTourPopoverProps['ionStepFinishBtnTitle'];
  @Input() public ionPrevStepId?: IonTourPopoverProps['ionPrevStepId'];
  @Input() public ionNextStepId?: IonTourPopoverProps['ionNextStepId'];
  @Input() public ionStepZIndex?: IonTourPopoverProps['ionStepZIndex'];
  @Input() public ionStepPosition?: IonTourPopoverProps['ionStepPosition'];
  @Input()
  public ionStepMarginToContent?: IonTourPopoverProps['ionStepMarginToContent'];
  @Input() public ionStepWidth?: IonTourPopoverProps['ionStepWidth'];
  @Input() public ionStepHeight?: IonTourPopoverProps['ionStepHeight'];
  @Input()
  public ionStepBackdropPadding?: IonTourPopoverProps['ionStepBackdropPadding'];
  @Input()
  public ionStepBackdropdZIndex?: IonTourPopoverProps['ionStepBackdropdZIndex'];
  @Input() public ionOnPrevStep: IonTourPopoverProps['ionOnPrevStep'];
  @Input() public ionOnNextStep: IonTourPopoverProps['ionOnNextStep'];
  @Input() public ionOnFinishTour: IonTourPopoverProps['ionOnFinishTour'];

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
    this.ionOnNextStep.emit();
  }

  public prev(): void {
    this.tourService.prevStep();
    this.ionOnPrevStep.emit();
  }

  public finish(): void {
    this.tourService.finish();
    this.ionOnFinishTour.emit();
  }

  public ngAfterViewChecked(): void {
    this.repositionPopover();
  }

  public ngOnChanges(): void {
    console.log('changes');
  }

  private repositionPopover(): void {
    const currentStep = this.tourService.currentStep.value;
    this.isActive =
      this.ionStepId &&
      !!currentStep &&
      currentStep.ionStepId === this.ionStepId;

    if (this.ionStepId && this.elementRef.nativeElement.children.length) {
      const newPosition = this.getNewPosition();
      this.top = newPosition.top + window.scrollY;
      this.left = newPosition.left + window.scrollX;
      this.cdr.detectChanges();
    }
  }

  private getNewPosition(): NewPosition {
    this.positionService.setHostPosition(this.target);
    this.positionService.setChoosedPosition(this.ionStepPosition);
    this.positionService.setElementPadding(this.ionStepMarginToContent);
    this.positionService.setcomponentCoordinates(
      this.elementRef.nativeElement.children[0].getBoundingClientRect()
    );

    return this.positionService.getNewPosition(
      generatePositionCallback(
        this.ionStepBackdropPadding,
        this.ionStepMarginToContent
      )
    );
  }
}
