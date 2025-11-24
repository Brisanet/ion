import { DirectionType } from './direction';

export type DividerType = 'solid' | 'dashed' | 'text';

export interface IonDividerProps {
  label?: string;
  direction?: DirectionType;
  type?: DividerType;
  margin?: boolean;
}
