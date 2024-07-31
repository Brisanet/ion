import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { isString } from 'lodash';

import { IonTourPopoverProps } from '../../core/types';
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
  @Input() target: IonTourPopoverProps['target'];
  @Input() ionStepId: IonTourPopoverProps['ionStepId'];
  @Input() ionTourId: IonTourPopoverProps['ionTourId'];
  @Input() ionStepTitle: IonTourPopoverProps['ionStepTitle'];
  @Input() ionStepContent: IonTourPopoverProps['ionStepContent'];
  @Input()
  ionStepPrevBtnTitle: IonTourPopoverProps['ionStepPrevBtnTitle'];
  @Input()
  ionStepNextBtnTitle: IonTourPopoverProps['ionStepNextBtnTitle'];
  @Input()
  ionStepFinishBtnTitle: IonTourPopoverProps['ionStepFinishBtnTitle'];
  @Input() ionPrevStepId?: IonTourPopoverProps['ionPrevStepId'];
  @Input() ionNextStepId?: IonTourPopoverProps['ionNextStepId'];
  @Input() ionStepPosition: IonTourPopoverProps['ionStepPosition'];
  @Input()
  ionStepMarginToContent: IonTourPopoverProps['ionStepMarginToContent'];
  @Input()
  ionStepBackdropPadding: IonTourPopoverProps['ionStepBackdropPadding'];
  @Input()
  ionStepCustomClass?: IonTourPopoverProps['ionStepBackdropCustomClass'] = '';
  @Input()
  ionStepBackdropCustomClass?: IonTourPopoverProps['ionStepBackdropCustomClass'];

  @Output() ionOnPrevStep: IonTourPopoverProps['ionOnPrevStep'];
  @Output() ionOnNextStep: IonTourPopoverProps['ionOnNextStep'];
  @Output() ionOnFinishTour: IonTourPopoverProps['ionOnFinishTour'];

  public top = 0;
  public left = 0;
  public isString = isString;

  constructor(
    private readonly tourService: IonTourService,
    private readonly positionService: IonPositionService,
    private readonly elementRef: ElementRef,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public ngAfterViewChecked(): void {
    this.repositionPopover();
  }

  public ngOnChanges(): void {
    this.repositionPopover();
  }

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

  private repositionPopover(): void {
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
