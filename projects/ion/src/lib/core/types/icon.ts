import { iconsPaths } from '../../icon/svgs/icons';

export type IconType = keyof typeof iconsPaths;

export interface IonIconProps {
  type: IconType;
  size?: number;
  color?: string;
}
