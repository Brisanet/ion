import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { IonStepsComponent } from '../projects/ion/src/lib/step/step.component';

export default {
  title: 'Ion/Navigation/Steps',
  component: IonStepsComponent,
  decorators: [
    moduleMetadata({
      declarations: [IonIconComponent],
    }),
  ],
} as Meta;

const Template: Story<IonStepsComponent> = (args: IonStepsComponent) => ({
  component: IonStepsComponent,
  props: args,
});

export const Basic = Template.bind({});
Basic.args = {
  steps: [
    {
      label: 'First',
    },
    {
      label: 'Second',
    },
    {
      label: 'Third',
    },
  ],
};

export const Disabled = Template.bind({});
Disabled.args = {
  steps: [
    {
      label: 'First',
      status: 'checked',
    },
    {
      label: 'Second',
    },
    {
      label: 'Third',
    },
  ],
  disabled: true,
};

export const Checked = Template.bind({});
Checked.args = {
  steps: [
    {
      label: 'First',
      status: 'checked',
    },
    {
      label: 'Second',
      status: 'checked',
    },
    {
      label: 'Third',
    },
    {
      label: 'Fourty',
    },
  ],
};

export const WithError = Template.bind({});
WithError.args = {
  steps: [
    {
      label: 'First',
      status: 'checked',
    },
    {
      label: 'Second',
      status: 'error',
      description: 'Atenção neste passo',
    },
    {
      label: 'Third',
    },
    {
      label: 'Fourty',
    },
  ],
};
