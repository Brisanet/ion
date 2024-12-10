import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { IonTourStepProps } from '../../core/types';

@Component({
  selector: 'ion-tour-backdrop',
  templateUrl: './tour-backdrop.component.html',
  styleUrls: ['./tour-backdrop.component.scss'],
})
export class IonTourBackdropComponent implements OnInit {
  @Input() isActive = false;

  public currentStep: IonTourStepProps | null = null;
  public inTransition = true;
  public clipPath: SafeStyle = '';

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    setTimeout(() => (this.inTransition = false));
  }

  public updateStep(step: IonTourStepProps | null): void {
    this.currentStep = step;
    this.updateClipPath();
  }

  public performFinalTransition(callback: () => void): void {
    const transitionDuration = 400;
    this.inTransition = true;

    setTimeout(() => {
      this.inTransition = false;
      callback();
    }, transitionDuration);
  }

  private updateClipPath(): void {
    if (!this.currentStep) {
      this.clipPath = '';
      return;
    }

    const { getTarget, ionStepBackdropPadding: padding } = this.currentStep;
    const { top, left, bottom, right } = getTarget();

    this.clipPath = this.sanitizer.bypassSecurityTrustStyle(`polygon(
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

    this.cdr.detectChanges();
  }
}
