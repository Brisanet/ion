import { IonModalComponent } from './../projects/ion/src/lib/modal/component/modal.component';
import { IonModalService } from './../projects/ion/src/lib/modal/modal.service';
import { BodyMockComponent } from './../projects/ion/src/lib/card/mock/body-mock.component';
import {
  IonIndicatorButtonConfiguration,
  IonIndicatorButtonType,
} from './../projects/ion/src/lib/indicator/models/indicator';
import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { ButtonModule } from './../projects/ion/src/lib/button/button.module';
import { IonIndicatorComponent } from './../projects/ion/src/lib/indicator/indicator.component';
import { TooltipModule } from './../projects/ion/src/lib/tooltip/tooltip.module';

export default {
  title: 'Ion/Data Display/Indicator',
  component: IonIndicatorComponent,
} as Meta;

const Template: Story<IonIndicatorComponent> = (
  args: IonIndicatorComponent
) => ({
  component: IonIndicatorComponent,
  props: { ...args },
  moduleMetadata: {
    declarations: [IonIndicatorComponent, IonModalComponent, BodyMockComponent],
    imports: [CommonModule, ButtonModule, TooltipModule],
    providers: [IonModalService],
    entryComponents: [IonModalComponent, BodyMockComponent],
  },
});

export const Default = Template.bind({});
Default.args = {
  title: 'Título personalizado via atributo title',
  value: 1500,
  secondValue: '5%',
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  title: 'Título do Indicator',
  tooltipText: 'Texto personalizado via atributo tooltipText',
  value: 1500,
  secondValue: '5%',
};

const buttonEmitter: IonIndicatorButtonConfiguration = {
  label: 'Detalhes',
  type: IonIndicatorButtonType.Emitter,
};
export const WithEmitterButton = Template.bind({});
WithEmitterButton.args = {
  title: 'Com botão emitter',
  value: 1500,
  secondValue: '5%',
  buttonConfig: buttonEmitter,
};

const buttonRedirect: IonIndicatorButtonConfiguration = {
  label: 'Link',
  type: IonIndicatorButtonType.Redirect,
  redirectLink: 'https://github.com/Brisanet/ion',
};
export const withRedirect = Template.bind({});
withRedirect.args = {
  title: 'Com botão que redireciona para link',
  value: 'Rayanne',
  secondValue: 200,
  buttonConfig: buttonRedirect,
};

const buttonModal: IonIndicatorButtonConfiguration = {
  label: 'Abrir modal',
  type: IonIndicatorButtonType.Modal,
  componentToModal: BodyMockComponent,
};
export const withOpenModal = Template.bind({});
withOpenModal.args = {
  title: 'Com botão que abre modal',
  value: 1500,
  secondValue: '5%',
  buttonConfig: buttonModal,
};
