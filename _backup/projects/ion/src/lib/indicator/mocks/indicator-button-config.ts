import { BodyMockComponent } from '../../card/mock/body-mock.component';
import {
  IonIndicatorButtonConfiguration,
  IonIndicatorButtonType,
} from '../../core/types/indicator';

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
