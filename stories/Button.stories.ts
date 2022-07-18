import { Story, Meta } from '@storybook/angular/types-6-0';
import { ButtonComponent } from '../projects/ion/src/lib/button/button.component';

export default {
  title: 'Ion/Buttons',
  component: ButtonComponent,
} as Meta;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  component: ButtonComponent,
  props: args,
});

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  label: 'Custom labell',
};
