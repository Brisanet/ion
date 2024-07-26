import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { IonTourPopoverProps } from '../../core/types/tour';

@Component({
  selector: 'ion-tour-backdrop',
  templateUrl: './tour-backdrop.component.html',
  styleUrls: ['./tour-backdrop.component.scss'],
})
export class IonTourBackdropComponent implements OnInit {
  @Input() public currentStep: IonTourPopoverProps | null = null;
  @Input() public isActive = false;

  public isTransitioning = true;

  public get clipPath(): SafeStyle {
    const { target, ionStepBackdropPadding: padding } = this.currentStep!;
    const { top, left, bottom, right } = target;

    return this.sanitizer.bypassSecurityTrustStyle(`polygon(
      0 0,
      0 100%,
      ${left - padding!}px 100%,
      ${left - padding!}px ${top - padding!}px,
      ${right + padding!}px ${top - padding!}px,
      ${right + padding!}px ${bottom + padding!}px,
      ${left - padding!}px ${bottom + padding!}px,
      ${left - padding!}px 100%,
      100% 100%,
      100% 0
    )`);
  }

  constructor(private sanitizer: DomSanitizer) {}

  public ngOnInit(): void {
    setTimeout(() => (this.isTransitioning = false));
  }
}
