import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonSwitchComponent } from '../projects/ion/src/lib/switch/switch.component';

export default {
  title: 'Ion/Data Entry/Switch',
  component: IonSwitchComponent,
} as Meta;

const Template: Story<IonSwitchComponent> = (args: IonSwitchComponent) => ({
  component: IonSwitchComponent,
  props: args,
});

export const Basic = Template.bind({});
Basic.args = {
  value: false,
};
