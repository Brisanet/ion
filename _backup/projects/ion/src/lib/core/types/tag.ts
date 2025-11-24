import { TagStatus } from './status';

export interface IonTagProps {
  outline?: boolean;
  status?: TagStatus;
  color?: string;
  label: string;
  icon?: string;
  backgroundColor?: string;
}
