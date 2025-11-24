export type IonSpinnerTextSize = 'sm' | 'md' | 'lg';
export type IonSpinnerColor = 'primary' | 'secondary' | 'danger';

export interface IonSpinnerProps {
  size?: number;
  color?: IonSpinnerColor;
  customColor?: string;
  text?: string;
  textSize?: IonSpinnerTextSize;
}
