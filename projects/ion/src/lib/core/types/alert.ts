import { StatusType } from './status';

export interface IonAlertProps {
  message: string;
  type?: StatusType;
  closable?: boolean;
  hideBackground?: boolean;
}
