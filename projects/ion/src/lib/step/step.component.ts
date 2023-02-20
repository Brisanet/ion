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

export type LineType = 'initial' | 'final';

export type StepConfig = {
  current: number;
  disabled?: boolean;
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
  @Input() steps: StepType[];
  @Input() disabled = false;
  @Input() clickable: boolean;
  @Output() indexChange = new EventEmitter<number>();

  public firstCatchStatus = true;

  public lineVisibility(lineType: LineType, step: StepType): boolean {
    return !(lineType === 'initial'
      ? step.index === 1
      : step.index === this.steps.length);
  }

  public beforeStepIsChecked(index: number): boolean {
    return (
      this.steps[index - 1] && this.steps[index - 1].status === Status.checked
    );
  }

  public afterStepIsChecked(index: number): boolean {
    if (this.steps[index].status === Status.checked) return true;
    return (
      this.steps[index + 1] && this.steps[index + 1].status !== Status.default
    );
  }

  stepStatus(step: StepType, currentIndex: number): StatusType {
    if (step.index < currentIndex) return Status.checked;
    if (step.index === currentIndex) return Status.selected;
    return Status.default;
  }

  checkStartedStatus(step: StepType, currentIndex: number): StatusType {
    return step.status ? step.status : this.stepStatus(step, currentIndex);
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
          : this.stepStatus(step, currentIndex),
      };
    });

    this.firstCatchStatus = false;
  }

  goesTo(index: number): void {
    if (this.clickable && !this.disabled) this.indexChange.emit(index);
  }

  ngOnInit(): void {
    this.generateIndexesForStep();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.current && !changes.current.firstChange) {
      this.changeStep(changes.current.currentValue);
    }
  }

  private generateIndexesForStep(): void {
    this.steps.forEach((step, index) => {
      step.index = index + 1;
    });
    this.changeStep(this.current);
  }
}
