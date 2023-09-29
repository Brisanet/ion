import { IconType, IonButtonProps } from '../../core/types';
import { SafeAny } from '../../utils/safe-any';

export interface IonModalConfiguration {
  id?: string;
  title?: string;
  width?: number;
  showOverlay?: boolean;
  overlayCanDismiss?: boolean;
  ionParams?: SafeAny;
  headerButton?: IonModalHeaderButton;

  footer?: IonModalFooterConfiguration;
}

export interface IonModalFooterConfiguration {
  hide?: boolean;
  showDivider?: boolean;

  primaryButton?: IonButtonProps;
  secondaryButton?: IonButtonProps;
}

interface IonModalHeaderButton {
  icon: IconType;
  label?: string;
  disabled?: () => boolean;
  hidden?: () => boolean;
}

export interface IonModalResponse {
  [key: string]: unknown;
}
