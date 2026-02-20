import { SafeAny } from '../../utils/safe-any';

export interface RadioOptions {
  label: string;
  value: SafeAny;
  disabled?: boolean;
}

export interface RadioSelectedOption {
  label: string;
  value: SafeAny;
  groupName: string;
}
