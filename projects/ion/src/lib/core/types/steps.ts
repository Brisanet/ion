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

export enum Status {
  default = 'default',
  selected = 'selected',
  checked = 'checked',
  error = 'error',
}
