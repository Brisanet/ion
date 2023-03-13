import { Story, Meta } from '@storybook/angular/types-6-0';
import { IonRadioGroupComponent } from '../projects/ion/src/lib/radio-group/radio-group.component';

export default {
  title: 'Ion/Data Entry/Radio Group',
  component: IonRadioGroupComponent,
  argTypes: {
    valueChange: {
      type: 'symbol',
    },
    setValue: {
      type: 'symbol',
    },
  },
} as Meta;

const Template: Story<IonRadioGroupComponent> = (
  args: IonRadioGroupComponent
) => ({
  component: IonRadioGroupComponent,
  props: args,
});

export const Basic = Template.bind({});
Basic.args = {
  options: [
    {
      label: 'Option 1',
      value: 'option-1',
    },
    {
      label: 'Option 2',
      value: 'option-2',
    },
    {
      label: 'Option 3',
      value: 'option-3',
    },
    {
      label: 'Option 4',
      value: 'option-4',
      disabled: true,
    },
  ],
};
