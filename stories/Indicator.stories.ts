import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { BodyMockComponent } from './../projects/ion/src/lib/card/mock/body-mock.component';
import { IonIndicatorComponent } from './../projects/ion/src/lib/indicator/indicator.component';
import { IonIndicatorModule } from './../projects/ion/src/lib/indicator/indicator.module';
import {
  buttonEmitterConfig,
  buttonModalConfig,
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

export const WithEmitterButton = Template.bind({});
WithEmitterButton.args = {
  title: 'Com botão emitter',
  value: 1500,
  secondValue: '5%',
  buttonConfig: buttonEmitterConfig,
};

export const withRedirect = Template.bind({});
withRedirect.args = {
  title: 'Com botão que redireciona para link',
  value: '1500',
  secondValue: 200,
  buttonConfig: buttonRedirectConfig,
};

export const withOpenModal = Template.bind({});
withOpenModal.args = {
  title: 'Com botão que abre modal',
  value: 1500,
  secondValue: '5%',
  buttonConfig: buttonModalConfig,
};
