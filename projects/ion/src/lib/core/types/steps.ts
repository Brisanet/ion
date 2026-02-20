import { EventEmitter } from '@angular/core';
import { DirectionType } from './direction';

export interface StepType {
  label: string;
  description?: string;
  index?: number;
  status?: StepStatus;
  lines?: StepLines;
  clickableWhenHasError?: boolean;
  disabled?: boolean;
  clickable?: boolean;
}

export interface StepLines {
  isPreviousBolded: boolean;
  isNextBolded: boolean;
}

export type StepConfig = {
  current: number;
  disabled?: boolean;
  steps: StepType[];
  direction?: DirectionType;
  preventStepChange?: boolean;
  indexChange?: EventEmitter<number>;
};

export enum StepStatus {
  DEFAULT = 'default',
  SELECTED = 'selected',
  CHECKED = 'checked',
  ERROR = 'error',
}
