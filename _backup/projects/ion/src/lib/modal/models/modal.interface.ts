import { ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';

import { IconType, IonAlertProps, IonButtonProps } from '../../core/types';
import { SafeAny } from '../../utils/safe-any';
import { IonModalComponent } from '../component/modal.component';

export interface IonModalConfiguration {
  id?: string;
  title?: string;
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

interface IonModalHeaderButton {
  icon: IconType;
  label?: string;
  disabled?: () => boolean;
  hidden?: () => boolean;
}

export interface IonModalResponse {
  [key: string]: unknown;
}

export interface ModalControl {
  ref: ComponentRef<IonModalComponent>;
  subscriber: Subject<IonModalResponse | unknown>;
}
