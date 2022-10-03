export interface IonModalProps {
  title: string;

  footer: {
    showDivider?: boolean;
    primaryButton: {
      iconType: string;
    };
    secondaryButton: {
      iconType: string;
    };
  };
}
