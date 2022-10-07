export class IonModalConfig {
  id?: string;
  title?: string;
  showOverlay?: boolean;
  overlayCanDismiss?: boolean;

  footer?: IonModalFooterConfig;
}

export interface IonModalFooterConfig {
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
