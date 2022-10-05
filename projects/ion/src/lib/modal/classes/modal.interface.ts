export interface IonModalProps {
  id?: string;
  title: string;
  canDismiss?: boolean;
  showOverlay?: boolean;

  footer?: {
    showDivider?: boolean;
    primaryButton: ModalButton;
    secondaryButton: ModalButton;
  };
}

export interface ModalButton {
  label: string;
  iconType?: string;
}

export interface IonModalEvent {
  property: string;
  value: unknown;
}
