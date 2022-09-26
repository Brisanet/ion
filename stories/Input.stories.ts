import { InputComponent } from '../projects/ion/src/lib/input/input.component';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';

export default {
  title: 'Input',
  component: InputComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      declarations: [IonIconComponent],
    }),
  ],
} as Meta;

const Template: Story<InputComponent> = (args: InputComponent) => ({
  component: InputComponent,
  props: args,
});

export const Basic = Template.bind({});
Basic.args = {
  label: 'Input',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Input',
  disabled: false,
};

export const IconLeft = Template.bind({});
IconLeft.args = {
  label: 'Input',
  icon: 'trash',
  iconLeft: false,
};

export const IconIvalid = Template.bind({});
IconIvalid.args = {
  label: 'Input',
  icon: 'close',
  IconIvalid: false,
};

export const Danger = Template.bind({});
Danger.args = {
  label: 'Input',
  danger: false,
};
