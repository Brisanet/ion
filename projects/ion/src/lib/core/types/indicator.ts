import { Type } from '@angular/core';
import { IonModalConfiguration } from './modal';
import { PopoverDirectiveProps } from './popover';
import { IonIconProps } from './icon';

export enum IonIndicatorButtonType {
  Redirect = 'redirect',
  Popover = 'popover',
  Modal = 'modal',
  Emitter = 'emitter',
}

export interface IonIndicatorProps {
  title?: string;
  headerIcon?: Pick<IonIconProps, 'type' | 'color'>;
  tooltipText?: string;
  secondValueTooltipText?: string;
  value?: string | number;
  secondValue?: string | number;
  buttonConfig?: IonIndicatorButtonConfiguration;
  preview?: boolean;
  loading?: boolean;
  error?: boolean;
  fullWidth?: boolean;
}

export interface IonIndicatorButtonConfiguration {
  label: string;
  icon?: string;
  /**
   * Determina o tipo de ação que o botão do Indicator realizará ao ser clicado seguindo o enum IonIndicatorButtonType
   * @example
   * export enum IonIndicatorButtonType {
   *  Redirect = 'redirect', // Redirecionará para um link em nova aba
   *  Modal = 'modal', // Irá abrir um modal
   *  Emitter = 'emitter', // Irá emitir evento ionClick
   *  Popover = 'popover', // Irá abrir um popover
   *}
   */
  type: IonIndicatorButtonType;
  /**
   * Para utilizar, é obrigatório o type ser IonIndicatorButtonType.Redirect
   * e o Link informado ser em protocolo HTTPS.
   * @example
   * const buttonRedirectExample: IonIndicatorButtonConfiguration {
   *   label: 'Link',
   *   type: IonIndicatorButtonType.Redirect,
   *   redirectLink: 'https://github.com/Brisanet/ion',
   * }
   */
  redirectLink?: string;
  /**
   * Para utilizar, é obrigatório o type ser IonIndicatorButtonType.Modal e também informar o Componente para o modal no atributo componentToModal.
   * A config segue a interface IonModalConfiguration
   * @example
   * const buttonModalExample: IonIndicatorButtonConfiguration {
   *   label: 'Link',
   *   type: IonIndicatorButtonType.Modal,
   *   modalConfig: IonModalConfiguration,
   *   componentToModal: MyComponent
   * }
   */
  modalConfig?: IonModalConfiguration;
  /**
   * Responsável por receber o componente a ser renderizado no modal. É obrigatório o type do botão ser IonIndicatorButtonType.Modal e também informar a config do modal, que segue a interface IonModalConfiguration.
   * @example´
   *   type: IonIndicatorButtonType.Modal,
   *   modalConfig: IonModalConfiguration,
   *   componentToModal: MyComponent
   * }
   */
  componentToModal?: Type<unknown>;
  /**
   * Para utilizar, é obrigatório o type ser IonIndicatorButtonType.Popover.
   * A config segue a interface PopoverProps
   * @example
   * const buttonPopoverExample: IonIndicatorButtonConfiguration {
   *   label: 'Open popover',
   *   type: IonIndicatorButtonType.Popover,
   *   popoverConfig: PopoverConfig,
   */
  popoverConfig?: PopoverConfig;
}

export interface PopoverConfig extends PopoverDirectiveProps {
  firstAction?: () => void;
  secondAction?: () => void;
}
