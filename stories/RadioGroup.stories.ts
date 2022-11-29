import { Story, Meta } from '@storybook/angular/types-6-0';
import { RadioGroupComponent } from '../projects/ion/src/lib/radio-group/radio-group.component';

export default {
  title: 'Ion/Data Entry/RadioGroup',
  component: RadioGroupComponent,
} as Meta;

const Template: Story<RadioGroupComponent> = (args: RadioGroupComponent) => ({
  component: RadioGroupComponent,
  props: args,
});

export const RadioGroup = Template.bind({});
RadioGroup.args = {
  radioGroup: [
    [
      { id: '0', label: 'Label' },
      { id: '1', label: 'Label' },
      { id: '2', label: 'Label' },
    ],
    [
      { id: '3', label: 'Label' },
      { id: '4', label: 'Label' },
      { id: '5', label: 'Label' },
      { id: '6', label: 'Label' },
    ],
    [
      { id: '7', label: 'Label' },
      { id: '8', label: 'Label' },
      { id: '9', label: 'Label' },
      { id: '10', label: 'Label' },
      { id: '11', label: 'Label' },
    ],
    [
      { id: '12', label: 'Label' },
      { id: '13', label: 'Label' },
      { id: '14', label: 'Label' },
      { id: '15', label: 'Label' },
      { id: '16', label: 'Label' },
      { id: '17', label: 'Label' },
      { id: '18', label: 'Label' },
    ],
  ],
};
