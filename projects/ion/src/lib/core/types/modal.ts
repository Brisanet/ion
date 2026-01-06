import { ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';

import { IconType } from './icon';
import { IonAlertProps } from './alert';
import { IonButtonProps } from './button';
import { SafeAny } from '../../utils/safe-any';

export interface IonModalConfiguration {
  id?: string;
  title?: string;
  titleIcon?: IconType;
  width?: number;
  showOverlay?: boolean;
  overlayCanDismiss?: boolean;
  preventCloseOnEscKey?: boolean;
  ionParams?: SafeAny;
  hideCloseButton?: boolean;
  headerButton?: IonModalHeaderButton;
  alertConfig?: Pick<IonAlertProps, 'message' | 'type' | 'description'>;
  preventCloseOnConfirm?: boolean;
  footer?: IonModalFooterConfiguration;
  customClass?: string;
}

export interface IonModalFooterConfiguration {
  hide?: boolean;
  showDivider?: boolean;

  primaryButton?: IonButtonProps;
  secondaryButton?: IonButtonProps;
}

export interface IonModalHeaderButton {
  icon: IconType;
  label?: string;
  disabled?: () => boolean;
  hidden?: () => boolean;
}

export interface IonModalResponse {
  [key: string]: unknown;
}

export interface ModalControl {
  overlayRef: any;
  componentRef: ComponentRef<any>;
  subscriber: Subject<IonModalResponse | unknown>;
}
