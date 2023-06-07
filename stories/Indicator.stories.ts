import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { BodyMockComponent } from './../projects/ion/src/lib/card/mock/body-mock.component';
import { IonIndicatorComponent } from './../projects/ion/src/lib/indicator/indicator.component';
import { IonIndicatorModule } from './../projects/ion/src/lib/indicator/indicator.module';
import {
  buttonEmitterConfig,
  buttonModalConfig,
  buttonPopoverConfig,
  buttonRedirectConfig,
} from '../projects/ion/src/lib/indicator/mocks/indicator-button-config';

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
    declarations: [BodyMockComponent],
    imports: [CommonModule, IonIndicatorModule],
    entryComponents: [BodyMockComponent],
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

export const WithPreview = Template.bind({});
WithPreview.args = {
  title: 'preview',
  value: 1500,
  secondValue: '5%',
  tooltipText: 'Texto personalizado via atributo tooltipText',
  buttonConfig: buttonEmitterConfig,
  preview: true,
};

export const WithLoading = Template.bind({});
WithLoading.args = {
  title: 'Tempo de SLA',
  value: 1500,
  secondValue: '5%',
  tooltipText: 'Texto personalizado via atributo tooltipText',
  buttonConfig: buttonEmitterConfig,
  loading: true,
};

export const WithError = Template.bind({});
WithError.args = {
  title: 'Tempo de SLA',
  value: 1500,
  secondValue: '5%',
  tooltipText: 'Texto personalizado via atributo tooltipText',
  buttonConfig: buttonEmitterConfig,
  error: true,
};

export const WithEmitterButton = Template.bind({});
WithEmitterButton.args = {
  title: 'Com botão emitter',
  value: 1500,
  secondValue: '5%',
  tooltipText: 'Texto personalizado via atributo tooltipText',
  buttonConfig: buttonEmitterConfig,
};

export const withRedirect = Template.bind({});
withRedirect.args = {
  title: 'Com botão que redireciona para link',
  value: '1500',
  secondValue: 200,
  tooltipText: 'Texto personalizado via atributo tooltipText',
  buttonConfig: buttonRedirectConfig,
};

export const withOpenModal = Template.bind({});
withOpenModal.args = {
  title: 'Com botão que abre modal',
  value: 1500,
  secondValue: '5%',
  tooltipText: 'Texto personalizado via atributo tooltipText',
  buttonConfig: buttonModalConfig,
};

export const withPopover = Template.bind({});
withPopover.args = {
  title: 'Com botão que abre popover',
  value: 1500,
  secondValue: '5%',
  tooltipText: 'Texto personalizado via atributo tooltipText',
  buttonConfig: buttonPopoverConfig,
};
