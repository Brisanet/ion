import { Story, Meta } from '@storybook/angular/types-6-0';
import { IonRadioComponent } from '../projects/ion/src/lib/radio/radio.component';

export default {
  title: 'Ion/Data Entry/Radio',
  component: IonRadioComponent,
} as Meta;

const Template: Story<IonRadioComponent> = (args: IonRadioComponent) => ({
  component: IonRadioComponent,
  props: args,
});

export const Basic = Template.bind({});
Basic.args = {
  label: '',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled',
  disabled: true,
};

export const checked = Template.bind({});
checked.args = {
  label: 'Checked',
  checked: true,
};
