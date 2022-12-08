import { Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata, Story } from '@storybook/angular';
import { InputAreaComponent } from '../projects/ion/src/lib/input-area/input-area.component';

export default {
  title: 'Ion/Data Entry/ Input-Area',
  component: InputAreaComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      declarations: [],
    }),
  ],
} as Meta;

const Template: Story<InputAreaComponent> = (args: InputAreaComponent) => ({
  component: InputAreaComponent,
  props: args,
});

export const InputArea = Template.bind({});
InputArea.args = {};

export const InputCustomPlaceholder = Template.bind({});
InputCustomPlaceholder.args = {
  placeholder: 'Digite algo aqui...',
};
