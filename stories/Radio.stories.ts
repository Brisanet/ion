import { Story, Meta } from '@storybook/angular/types-6-0';
import { IonRadioComponent } from '../projects/ion/src/lib/radio/radio.component';
import { IonRadioGroupComponent } from '../projects/ion/src/lib/radio-group/radio-group.component';

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

export const RadioGroup = () => ({
  component: IonRadioGroupComponent,
  props: {
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
  },
});
