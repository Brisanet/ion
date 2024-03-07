export interface StepType {
  label: string;
  description?: string;
  index?: number;
  status?: StepStatus;
  lines?: StepLines;
  clickableWhenHasError?: boolean;
}

export interface StepLines {
  isPreviousBolded: boolean;
  isNextBolded: boolean;
}

export type StepConfig = {
  current: number;
  disabled?: boolean;
  steps: StepType[];
  clickable?: boolean;
  direction?: StepDirection;
  preventStepChange?: boolean;
};

export enum StepStatus {
  DEFAULT = 'default',
  SELECTED = 'selected',
  CHECKED = 'checked',
  ERROR = 'error',
}

export enum StepDirection {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}
