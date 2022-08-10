import { IonIconComponent } from './../projects/ion/src/lib/icon/icon.component';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MessageComponent } from '../projects/ion/src/lib/message/message.component';

export default {
  title: 'Ion/Message',
  component: MessageComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      declarations: [IonIconComponent],
    }),
  ],
} as Meta;

const Template: Story<MessageComponent> = (args: MessageComponent) => ({
  component: MessageComponent,
  props: args,
});

export const Random = Template.bind({});
Random.args = {
  label: 'Custom label',
  type: 'random',
};

export const Positive = Template.bind({});
Positive.args = {
  label: 'Custom label',
  type: 'positive',
};

export const Negative1 = Template.bind({});
Negative1.args = {
  label: 'Custom label',
  type: 'negative1',
};

export const Negative2 = Template.bind({});
Negative2.args = {
  label: 'Custom label',
  type: 'negative2',
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
