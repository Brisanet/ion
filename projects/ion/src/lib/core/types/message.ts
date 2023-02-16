import { IconType } from './icon';

export interface IonMessageProps {
  label: string;
  type?: MessageStatusType;
  iconType?: IconType;
}

export type MessageStatusType =
  | 'positive'
  | 'negative_alert'
  | 'negative_erro'
  | 'warning'
  | 'info'
  | 'custom';
