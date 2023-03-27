import { SizeType } from './size';

export enum AvatarType {
  initials = 'initials',
  icon = 'icon',
  photo = 'photo',
}

export interface IonAvatarProps {
  type: AvatarType;
  size: SizeType;
  value?: string;
  image?: string;
  onErrorImage?: string;
}
