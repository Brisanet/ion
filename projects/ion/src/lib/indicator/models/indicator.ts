export enum IonIndicatorButtonType {
  Redirect = 'redirect',
  Popover = 'popover',
  Modal = 'modal',
  Emitter = 'emitter',
}

export interface IonIndicatorButtonConfig {
  label: string;
  redirectLink?: string;
  popoverMessage?: string;
  type: IonIndicatorButtonType;
  componentToModal?: unknown;
}
