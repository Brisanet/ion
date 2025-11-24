import { Story, Meta } from '@storybook/angular/types-6-0';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';

export default {
  title: 'Ion/Design Tokens/Icons',
  component: IonIconComponent,
} as Meta;

const Template: Story<IonIconComponent> = (args: IonIconComponent) => ({
  component: IonIconComponent,
  props: args,
});

export const IconDefault = Template.bind({});
IconDefault.args = {
  type: 'pencil',
  highlight: 'none',
};

export const IconOtherSize = Template.bind({});
IconOtherSize.args = {
  type: 'trash',
  size: 60,
  color: 'orange',
};
