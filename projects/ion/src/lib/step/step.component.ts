import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

export type StatusType = 'default' | 'selected' | 'checked' | 'error';

export interface StepType {
  label: string;
  description?: string;
  index?: number;
  status?: StatusType;
}

export type StepTheme = 'default' | 'pastel-tones' | 'dark-tones';

export type CrossType = 'initial' | 'final';

export type StepConfig = {
  current: number;
  disabled?: boolean;
  theme?: StepTheme;
  steps: StepType[];
  clickable?: boolean;
};

enum Status {
  default = 'default',
  selected = 'selected',
  checked = 'checked',
  error = 'error',
}

@Component({
  selector: 'ion-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class StepComponent implements OnInit, OnChanges {
  @Input() current = 1;
  @Input() disabled = false;
  @Input() theme: StepTheme = 'default';
  @Input() steps: StepType[];
  @Input() clickable: boolean;
  @Output() indexChange = new EventEmitter<number>();

  public firstCatchStatus = true;

  public crossVisibility(crossType: CrossType, step: StepType): boolean {
    const condition =
      crossType === 'initial'
        ? step.index === 1
        : step.index === this.steps.length;

    return !condition;
  }

  public beforeStepIsChecked(index: number): boolean {
    return this.steps[index - 1] && this.steps[index - 1].status === 'checked';
  }

  public afterStepIsChecked(index: number): boolean {
    return (
      this.steps[index + 1] &&
      (this.steps[index + 1].status === Status.checked ||
        this.steps[index + 1].status === Status.selected ||
        this.steps[index + 1].status === Status.error)
    );
  }

  generateIndexsForStep(): void {
    this.steps.forEach((step, index) => {
      step.index = index + 1;
    });
    this.changeStep(this.current);
  }

  checkStartedStatus(step: StepType, currentIndex: number): StatusType {
    return step.status
      ? step.status
      : step.index < currentIndex
      ? Status.checked
      : step.index === currentIndex
      ? Status.selected
      : Status.default;
  }

  changeStep(currentIndex: number): void {
    if (currentIndex < 1 || currentIndex > this.steps.length) {
      return;
    }

    this.steps = this.steps.map((step) => {
      return {
        ...step,
        status: this.firstCatchStatus
          ? this.checkStartedStatus(step, currentIndex)
          : step.index < currentIndex
          ? Status.checked
          : step.index === currentIndex
          ? Status.selected
          : Status.default,
      };
    });

    this.firstCatchStatus = false;
  }

  goesTo(index: number): void {
    this.clickable
      ? !this.disabled
        ? this.indexChange.emit(index)
        : null
      : null;
  }

  ngOnInit(): void {
    this.generateIndexsForStep();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.current && !changes.current.firstChange) {
      this.changeStep(changes.current.currentValue);
    }
  }
}
