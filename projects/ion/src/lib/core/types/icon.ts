import { iconsPaths } from '../../icon/svgs/icons';

export enum Highlight {
  SIMPLE = 'simple',
  DOUBLE = 'double',
  NONE = 'none',
}

export enum IconSizeMap {
  'small' = 16,
  'medium' = 20,
  'large' = 24,
  'xlarge' = 32
}

export type ContainerStyle = {
  size: string;
  color: string;
};

export type IconType = keyof typeof iconsPaths;

export type IconSize = keyof typeof IconSizeMap;

export type IconDirection = 'right' | 'left';

export interface IonIconProps {
  type: IconType;
  size?: IconSize | number;
  color?: string;
  highlight?: Highlight;
}
