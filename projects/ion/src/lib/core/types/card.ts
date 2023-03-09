import { ComponentType } from '@angular/cdk/overlay';
import { SafeAny } from '../../utils/safe-any';
import { IonChipProps } from './chip';
import { IconType } from './icon';
import { DropdownItem } from './dropdown';
import { TooltipProps } from './tooltip';

type ButtonType = 'primary' | 'secondary' | 'ghost';

interface ButtonBase {
  type: ButtonType;
  nameAction: string;
  label: string;
  icon?: string;
  circular?: boolean;
}

interface Header {
  title: string;
  buttons?: ButtonBase[];
  chips?: IonChipProps[];
  icon?: IconType;
  infoTooltip?: TooltipProps;
}

type FooterButton = {
  [keys in ButtonType]?: Pick<ButtonBase, 'label' | 'circular' | 'icon'>;
};

interface Footer {
  buttons?: FooterButton;
  body?: ComponentType<SafeAny>;
}

export interface IonCard {
  header: Header;
  body: ComponentType<SafeAny>;
  footer?: Footer;
}

export interface CardEvent {
  buttonAction?: ButtonType;
  chipSelected?: { chip: IonChipProps; index: number };
  selectedFromChipDropdown?: DropdownItem[];
}
