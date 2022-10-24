export interface IonModalConfiguration {
  id?: string;
  title?: string;
  showOverlay?: boolean;
  overlayCanDismiss?: boolean;

  footer?: IonModalFooterConfiguration;
}

export interface IonModalFooterConfiguration {
  hide?: boolean;
  showDivider?: boolean;

  primaryButton?: ModalButton;
  secondaryButton?: ModalButton;
}

export interface ModalButton {
  label?: string;
  iconType?: string;
}

export interface IonModalResponse {
  [key: string]: unknown;
}
