import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';

export interface StepType {
  label: string;
  description?: string;
  index?: number;
  status?: 'default' | 'selected' | 'checked' | 'error';
}

export type StepTheme = 'default' | 'pastel-tones' | 'dark-tones';

export type CrossType = 'initial' | 'final';

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
  @Output() indexChange = new EventEmitter<number>();

  public indexShowed = 1;

  // public startSteps(): void {
  //   let index = 1;
  //   const firstStep = this.steps[0];

  //   firstStep.status = firstStep.status ? firstStep.status : 'selected';

  //   this.steps.map((step, indexArray) => {
  //     const previusStep = this.steps[indexArray - 1];
  //     const actualStepStatus = step.status;
  //     if (
  //       actualStepStatus !== 'checked' &&
  //       previusStep &&
  //       previusStep.status === 'checked'
  //     ) {
  //       step.status = actualStepStatus ? actualStepStatus : 'selected';
  //     } else {
  //       step.status = actualStepStatus ? actualStepStatus : 'default';
  //     }
  //     step.index = index;
  //     ++index;
  //   });
  // }

  public crossVisibility(crossType: CrossType, step: StepType): boolean {
    const condition =
      crossType === 'initial'
        ? step.index === 1
        : step.index === this.steps.length;

    if (condition) {
      return false;
    } else {
      return true;
    }
  }

  public crossClassGenerator(crossType: CrossType, index: number): string {
    const condition =
      crossType === 'initial'
        ? this.steps[index - 1] && this.steps[index - 1].status === 'checked'
        : this.steps[index + 1] && this.steps[index + 1].status === 'checked';

    if (this.steps[index].status === 'checked' || condition) {
      return 'cross bolded';
    } else {
      return 'cross';
    }
  }

  public disabledConcactClass(prefix: string): string {
    return this.disabled ? prefix + ' disabled' : prefix;
  }

  public labelClassGenerator(step: StepType): string {
    if (step.status === 'selected' || step.status === 'error') {
      return this.disabledConcactClass('label selected');
    } else {
      return this.disabledConcactClass('label');
    }
  }

  public descriptionClassGenerator(): string {
    return this.disabledConcactClass('description');
  }

  // public reorganizeSteps(): void {
  //   this.steps.map((step, indexArray) => {
  //     const indexComparativo = indexArray + 1;
  //     if (indexComparativo < this.indexShowed) {
  //       step.status = 'checked';
  //     } else if (indexComparativo === this.indexShowed) {
  //       step.status = 'selected';
  //     } else if (indexComparativo > this.indexShowed) {
  //       step.status = 'default';
  //     }
  //   });
  // }

  // public checkMoveChange(index: SimpleChange): void {
  //   const currentIndex = index.currentValue;
  //   const previusIndex = index.previousValue;
  //   if (currentIndex > previusIndex) {
  //     if (this.indexShowed < this.steps.length) {
  //       this.indexShowed++;
  //     }
  //   } else if (currentIndex < previusIndex) {
  //     if (this.indexShowed > 1) {
  //       this.indexShowed--;
  //     }
  //   }
  //   this.reorganizeSteps();
  // }

  generateIndexsForStep(): void {
    this.steps.forEach((step, index) => {
      step.index = index + 1;
    });
  }

  changeStep(currentIndex: number): void {
    if (currentIndex < 1 || currentIndex > this.steps.length) {
      return;
    }

    this.steps = this.steps.map((step) => {
      return {
        ...step,
        status:
          step.index < currentIndex
            ? 'checked'
            : step.index === currentIndex
            ? 'selected'
            : 'default',
      };
    });
  }

  ngOnInit(): void {
    // this.startSteps();
    this.generateIndexsForStep();
    this.changeStep(1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.current && !changes.current.firstChange) {
    //   this.checkMoveChange(changes.current);
    // }
    this.changeStep(changes.current.currentValue);
  }
}
