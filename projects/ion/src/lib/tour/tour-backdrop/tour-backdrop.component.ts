import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { IonTourStepProps } from '../../core/types';

@Component({
  selector: 'ion-tour-backdrop',
  templateUrl: './tour-backdrop.component.html',
  styleUrls: ['./tour-backdrop.component.scss'],
})
export class IonTourBackdropComponent implements OnInit {
  @Input() currentStep: IonTourStepProps | null = null;
  @Input() isActive = false;

  public inTransition = true;

  public get clipPath(): SafeStyle {
    if (!this.currentStep) {
      return '';
    }

    const { getTarget, ionStepBackdropPadding: padding } = this.currentStep;
    const { top, left, bottom, right } = getTarget();

    return this.sanitizer.bypassSecurityTrustStyle(`polygon(
      0 0,
      0 100%,
      ${left - padding}px 100%,
      ${left - padding}px ${top - padding}px,
      ${right + padding}px ${top - padding}px,
      ${right + padding}px ${bottom + padding}px,
      ${left - padding}px ${bottom + padding}px,
      ${left - padding}px 100%,
      100% 100%,
      100% 0
    )`);
  }

  constructor(private sanitizer: DomSanitizer) {}

  public ngOnInit(): void {
    setTimeout(() => (this.inTransition = false));
  }

  public performFinalTransition(callback: () => void): void {
    const transitionDuration = 400;
    this.inTransition = true;

    setTimeout(() => {
      this.inTransition = false;
      callback();
    }, transitionDuration);
  }
}
