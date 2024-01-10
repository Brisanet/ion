import { IonSpinnerColor } from '../../spinner/spinner.component';

export type IonSpinnerTextSize = 'sm' | 'md' | 'lg';

export interface IonSpinnerProps {
  size?: number;
  color?: IonSpinnerColor;
  customColor?: string;
  text?: string;
  textSize?: IonSpinnerTextSize;
}
