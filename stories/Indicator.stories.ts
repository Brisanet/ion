import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { ButtonModule } from './../projects/ion/src/lib/button/button.module';
import {
  IonIndicatorButtonConfig,
  IonIndicatorButtonType,
  IonIndicatorComponent,
} from './../projects/ion/src/lib/indicator/indicator.component';
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
    declarations: [IonIndicatorComponent],
    imports: [CommonModule, ButtonModule, TooltipModule],
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

const buttonEmitter: IonIndicatorButtonConfig = {
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

const buttonRedirect: IonIndicatorButtonConfig = {
  label: 'Link',
  type: IonIndicatorButtonType.Redirect,
};
export const withRedirect = Template.bind({});
withRedirect.args = {
  title: 'Com botão que redireciona para link',
  value: 1500,
  secondValue: '5%',
  buttonConfig: buttonRedirect,
};

const buttonModal: IonIndicatorButtonConfig = {
  label: 'Detalhes',
  type: IonIndicatorButtonType.Modal,
};
export const withOpenModal = Template.bind({});
withOpenModal.args = {
  title: 'Com botão que abre modal',
  value: 1500,
  secondValue: '5%',
  buttonConfig: buttonModal,
};
