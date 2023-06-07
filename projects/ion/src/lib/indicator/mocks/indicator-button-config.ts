import { BodyMockComponent } from '../../card/mock/body-mock.component';
import {
  IonIndicatorButtonConfiguration,
  IonIndicatorButtonType,
} from '../../core/types/indicator';
import { PopoverPosition } from '../../core/types/popover';

export const buttonModalConfig: IonIndicatorButtonConfiguration = {
  label: 'Abrir modal',
  type: IonIndicatorButtonType.Modal,
  componentToModal: BodyMockComponent,
  modalConfig: {
    title: 'Modal aberto pelo Ion Indicator',
    footer: {
      primaryButton: {
        label: 'Confirmar',
      },
    },
  },
};

export const buttonRedirectConfig: IonIndicatorButtonConfiguration = {
  label: 'Link',
  type: IonIndicatorButtonType.Redirect,
  redirectLink: 'https://github.com/Brisanet/ion',
};

export const buttonEmitterConfig: IonIndicatorButtonConfiguration = {
  label: 'Detalhes',
  type: IonIndicatorButtonType.Emitter,
};

export const buttonPopoverConfig: IonIndicatorButtonConfiguration = {
  label: 'Abrir popover',
  type: IonIndicatorButtonType.Popover,
  popoverConfig: {
    ionPopoverTitle: 'Título do popover',
    ionPopoverContent: 'Bounce Bounce Bouncing',
    ionPopoverPosition: PopoverPosition.DEFAULT,
    ionPopoverActions: [{ label: 'action 1' }, { label: 'action 2' }],
    ionPopoverIconClose: true,
  },
};
