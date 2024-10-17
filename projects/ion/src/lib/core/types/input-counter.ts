export type InputCountSize = 'sm' | 'md';

export interface IonInputCount {
  inputSize: InputCountSize;
  minValue?: number;
  maxValue?: number;
  maxDigits?: number;
  disabled?: boolean;
  count?: number;
}
