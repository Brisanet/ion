import { FormsModule } from '@angular/forms';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonTripleToggleComponent } from '../projects/ion/src/lib/triple-toggle/triple-toggle.component';
import {
  IonSharedModule,
  IonTooltipModule,
} from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Data Entry/Triple Toggle',
  component: IonTripleToggleComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, IonSharedModule, IonTooltipModule],
    }),
  ],
} as Meta;

const Template: Story<IonTripleToggleComponent> = (
  args: IonTripleToggleComponent
) => ({
  component: IonTripleToggleComponent,
  props: args,
});

export const Basic = Template.bind({});

export const TripleToggleSmall = Template.bind({});
TripleToggleSmall.args = {
  size: 'sm',
};

export const TripleToggleLarge = Template.bind({});
TripleToggleLarge.args = {
  size: 'lg',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
  value: true,
};

export const CustomConfiguration = Template.bind({});
CustomConfiguration.args = {
  configuration: [
    {
      value: 'box',
      label: 'Box',
      icon: 'box',
      tooltip: 'Box to exemplify.',
    },
    {
      value: undefined,
      label: '-',
      tooltip: 'Neutral',
    },
    {
      value: 'star',
      label: 'Star',
      icon: 'star',
      tooltip: 'Star to exemplify.',
    },
  ],
};
