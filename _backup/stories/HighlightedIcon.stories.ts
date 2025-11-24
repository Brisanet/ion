import { Story } from '@storybook/angular';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { Highlight } from '../projects/ion/src/lib/core/types/icon';

export default {
  title: 'Ion/Design Tokens/Icons/Highlighted',
  parameters: { docs: false },
  component: IonIconComponent,
};

const Template: Story<IonIconComponent> = (args: IonIconComponent) => ({
  component: IonIconComponent,
  props: args,
});

export const SimpleHighlight = Template.bind({});
SimpleHighlight.args = {
  type: 'trash',
  size: 32,
  color: '#FF0016',
  highlight: Highlight.SIMPLE,
};

export const DoubleHighlight = Template.bind({});
DoubleHighlight.args = {
  type: 'trash',
  size: 32,
  color: '#FF0016',
  highlight: Highlight.DOUBLE,
};
