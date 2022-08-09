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

export const Basic = Template.bind({});
Basic.args = {
  label: 'Custom label',
};
