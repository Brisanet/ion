import { IonButtonProps } from '../../core/types';
import { SafeAny } from '../../utils/safe-any';

export interface IonModalConfiguration {
  id?: string;
  title?: string;
  width?: number;
  showOverlay?: boolean;
  overlayCanDismiss?: boolean;
  ionParams?: SafeAny;

  footer?: IonModalFooterConfiguration;
}

export interface IonModalFooterConfiguration {
  hide?: boolean;
  showDivider?: boolean;

  primaryButton?: IonButtonProps;
  secondaryButton?: IonButtonProps;
}

export interface IonModalResponse {
  [key: string]: unknown;
}
