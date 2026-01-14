import { CommonModule } from '@angular/common';
import { Component, effect, input, output, signal } from '@angular/core';
import { StepStatus, StepType } from '../core/types';
import { IonIconComponent } from '../icon/icon.component';
import { EllipsisPipe } from '../utils/pipes/ellipsis/ellipsis.pipe';

@Component({
  selector: 'ion-steps',
  standalone: true,
  imports: [CommonModule, IonIconComponent, EllipsisPipe],
  templateUrl: './ion-step.component.html',
  styleUrls: ['./ion-step.component.scss'],
})
export class IonStepsComponent {
  current = input<number>(1);
  steps = input<StepType[]>([]);
  disabled = input<boolean>(false);
  clickable = input<boolean>(false);
  preventStepChange = input<boolean>(false);
  direction = input<'horizontal' | 'vertical'>('horizontal');

  indexChange = output<number>();

  displaySteps = signal<StepType[]>([]);

  public readonly FIRST_STEP = 1;
  private firstCatchStatus = true;

  constructor() {
    effect(() => {
      const currentSteps = this.steps();
      const currentIndex = this.current();

      this.updateSteps(currentIndex);
    });
  }

  updateSteps(currentIndex: number): void {
    const rawSteps = this.steps();
    if (!rawSteps || rawSteps.length === 0) {
      this.displaySteps.set([]);
      return;
    }

    let processedSteps: StepType[] = rawSteps.map((step, index) => ({
      ...step,
      index: index + 1,
    }));

    const clampedIndex = Math.max(
      this.FIRST_STEP,
      Math.min(currentIndex, processedSteps.length)
    );

    processedSteps = processedSteps.map((step) => {
      return this.getStep(clampedIndex, step);
    });

    this.displaySteps.set(this.formatStepLines(processedSteps));
    this.firstCatchStatus = false;
  }

  stepStatus(step: StepType, currentIndex: number): StepStatus {
    const stepIndex = step.index || 0;
    if (stepIndex < currentIndex) return StepStatus.CHECKED;
    if (stepIndex === currentIndex) return StepStatus.SELECTED;
    return StepStatus.DEFAULT;
  }

  checkStartedStatus(step: StepType, currentIndex: number): StepStatus {
    return step.status ? step.status : this.stepStatus(step, currentIndex);
  }

  getStep(currentIndex: number, step: StepType): StepType {
    if (
      step.status &&
      (step.status === StepStatus.ERROR || this.disabled() || step.disabled)
    ) {
      return step;
    }

    return {
      ...step,
      status: this.firstCatchStatus
        ? this.checkStartedStatus(step, currentIndex)
        : this.stepStatus(step, currentIndex),
    };
  }

  formatStepLines(steps: StepType[]): StepType[] {
    return steps.map((step, index) => ({
      ...step,
      lines: {
        isPreviousBolded: this.shouldConnectSteps(steps[index - 1], step),
        isNextBolded: this.shouldConnectSteps(step, steps[index + 1]),
      },
    }));
  }

  shouldConnectSteps(firstStep?: StepType, secondStep?: StepType): boolean {
    return (
      !!firstStep &&
      !!secondStep &&
      ![firstStep.status, secondStep.status].includes(StepStatus.DEFAULT)
    );
  }

  goesTo(index?: number): void {
    if (index === undefined) return;
    const steps = this.displaySteps();
    // Check if previous step exists and is not disabled
    // steps index is 0-based, but step.index is 1-based.
    // If index is 1 (first step), steps[index-1] is steps[0].
    // Wait, logic: !steps[index - 1].disabled
    // If index is 1, steps[0] is the step itself?
    // No, steps array is 0-indexed. Step 1 is at index 0.
    // If I click Step 3 (index 3), I want to check if Step 2 (index 2) is disabled?
    // Original code: !this.steps[index - 1].disabled
    // If index is the step index (1-based).
    // If I click Step 1 (index 1). steps[0].
    // If I click Step 2 (index 2). steps[1].
    // The check `!this.steps[index - 1].disabled` checks the step itself?
    // "goesTo(step.index)" passes the 1-based index.
    // steps[index-1] accesses the step at that index.
    // So it checks if the TARGET step is disabled.

    if (this.clickable() && !this.disabled() && !steps[index - 1]?.disabled) {
      this.indexChange.emit(index);
      if (!this.preventStepChange()) {
        this.updateSteps(index);
      }
    }
  }
}
