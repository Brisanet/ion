import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { IonStepsComponent } from '../projects/ion/src/lib/step/step.component';
import { PipesModule } from '../projects/ion/src/lib/utils/pipes/pipes.module';

export default {
  title: 'Ion/Navigation/Steps',
  component: IonStepsComponent,
  decorators: [
    moduleMetadata({
      declarations: [IonIconComponent],
      imports: [PipesModule],
    }),
  ],
  argTypes: {
    current: {
      name: 'current',
      control: 'number',
      defaultValue: 1,
    },
    steps: {
      name: 'steps',
    },
    disabled: {
      name: 'disabled',
      type: { name: 'boolean' },
      defaultValue: false,
    },
    preventStepChange: {
      name: 'preventStepChange',
      type: { name: 'boolean' },
      defaultValue: false,
    },
    direction: {
      name: 'direction',
      control: 'radio',
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
    },
  },
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

export const Vertical = Template.bind({});
Vertical.args = {
  direction: 'vertical',
  steps: [
    {
      label: 'First',
      description: '(optional)',
    },
    { label: 'Second' },
    { label: 'Third' },
  ],
};

export const WithLongDescription = Template.bind({});
WithLongDescription.args = {
  direction: 'vertical',
  steps: [
    {
      label: 'First',
      description:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    },
    { label: 'Second' },
    { label: 'Third' },
  ],
};

export const PreventStepChange = Template.bind({});
PreventStepChange.args = {
  preventStepChange: true,
  steps: [
    {
      label: 'First',
      description: '(optional)',
      clickable: true,
    },
    { label: 'Second', clickable: true },
    { label: 'Third', clickable: true },
  ],
};

export const WithErrorInOtherStep = Template.bind({});
WithErrorInOtherStep.args = {
  steps: [
    {
      label: 'First',
      description: '(optional)',
      status: 'error',
    },
    { label: 'Second', status: 'checked' },
    { label: 'Third', status: 'selected' },
  ],
};

export const WithStepClickableWhenHasError = Template.bind({});
WithStepClickableWhenHasError.args = {
  steps: [
    {
      label: 'First',
      description: '(optional)',
      status: 'error',
      clickableWhenHasError: true,
      clickable: true,
    },
    { label: 'Second', status: 'checked', clickable: true },
    { label: 'Third', status: 'selected', clickable: true },
  ],
};

export const DisabledItem = Template.bind({});
DisabledItem.args = {
  steps: [
    {
      label: 'First',
    },
    {
      label: 'Second',
      disabled: true,
    },
    {
      label: 'Third',
      status: 'checked',
    },
  ],
};
