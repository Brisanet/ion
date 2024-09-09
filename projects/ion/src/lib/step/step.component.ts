import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { StepConfig, StepStatus, StepType } from '../core/types';

@Component({
  selector: 'ion-steps',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class IonStepsComponent implements OnInit, OnChanges {
  @Input() current: StepConfig['current'] = 1;
  @Input() steps: StepConfig['steps'];
  @Input() disabled: StepConfig['disabled'] = false;
  @Input() preventStepChange: StepConfig['preventStepChange'] = false;
  @Input() direction: StepConfig['direction'] = 'horizontal';
  @Output() indexChange: StepConfig['indexChange'] = new EventEmitter<number>();

  public firstCatchStatus = true;

  FIRST_STEP = 1;

  stepStatus(step: StepType, currentIndex: number): StepStatus {
    if (step.index < currentIndex) return StepStatus.CHECKED;
    if (step.index === currentIndex) return StepStatus.SELECTED;
    return StepStatus.DEFAULT;
  }

  checkStartedStatus(step: StepType, currentIndex: number): StepStatus {
    return step.status ? step.status : this.stepStatus(step, currentIndex);
  }

  changeStep(currentIndex: number, onlyStepChanged = false): void {
    if (currentIndex < this.FIRST_STEP || currentIndex > this.steps.length) {
      return;
    }
    this.steps = this.steps.map((step) => {
      return this.getStep(currentIndex, step, onlyStepChanged);
    });

    this.formatStepLines();
    this.firstCatchStatus = false;
  }

  getStep(
    currentIndex: number,
    step: StepType,
    onlyStepChanged?: boolean
  ): StepType {
    if (
      step.status &&
      (step.status === StepStatus.ERROR ||
        onlyStepChanged ||
        this.disabled ||
        step.disabled)
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

  goesTo(index: number): void {
    if (
      this.steps[index - 1].clickable &&
      !this.disabled &&
      !this.steps[index - 1].disabled
    ) {
      this.indexChange.emit(index);
      if (!this.preventStepChange) {
        this.changeStep(index);
      }
    }
  }

  ngOnInit(): void {
    this.generateIndexesForStep();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.current && !changes.current.firstChange) {
      this.changeStep(changes.current.currentValue);
    }
    if (changes.steps && !changes.steps.firstChange) {
      this.changeStep(this.current, true);
    }
  }

  private generateIndexesForStep(): void {
    this.steps.forEach((step, index) => {
      step.index = index + 1;
    });
    this.changeStep(this.current);
  }

  private formatStepLines(): void {
    this.steps = this.steps.map((step, index) => ({
      ...step,
      lines: {
        isPreviousBolded: this.shouldConnectSteps(this.steps[index - 1], step),
        isNextBolded: this.shouldConnectSteps(step, this.steps[index + 1]),
      },
    }));
  }

  private shouldConnectSteps(
    firstStep?: StepType,
    secondStep?: StepType
  ): boolean {
    return (
      !!firstStep &&
      !!secondStep &&
      ![firstStep.status, secondStep.status].includes(StepStatus.DEFAULT)
    );
  }
}
