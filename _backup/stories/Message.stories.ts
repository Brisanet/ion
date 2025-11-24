import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { IonMessageComponent } from '../projects/ion/src/lib/message/message.component';
import { IonIconModule } from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Feedback/Message',
  component: IonMessageComponent,
  decorators: [
    moduleMetadata({
      imports: [IonIconModule],
    }),
  ],
} as Meta;

const Template: Story<IonMessageComponent> = (args: IonMessageComponent) => ({
  component: IonMessageComponent,
  props: args,
});

export const Positive = Template.bind({});
Positive.args = {
  label: 'Custom label',
  type: 'positive',
};

export const Negative_alert = Template.bind({});
Negative_alert.args = {
  label: 'Custom label',
  type: 'negative_alert',
};

export const Negative_erro = Template.bind({});
Negative_erro.args = {
  label: 'Custom label',
  type: 'negative_erro',
};

export const Warning = Template.bind({});
Warning.args = {
  label: 'Custom label',
  type: 'warning',
};

export const Info = Template.bind({});
Info.args = {
  label: 'Custom label',
  type: 'info',
};

export const Custom = Template.bind({});
Custom.args = {
  label: 'Custom label',
  type: 'custom',
};
