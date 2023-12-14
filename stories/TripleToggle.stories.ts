import { FormsModule } from '@angular/forms';
import { action } from '@storybook/addon-actions';
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
  props: { ...args, ionClick: action('ionClick') },
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
  options: [
    {
      value: 'box',
      label: 'Box',
      icon: 'box',
      tooltip: 'Box to exemplify.',
    },
    {
      value: 'star',
      label: 'Star',
      icon: 'star',
      tooltip: 'Star to exemplify.',
    },
  ],
};

export const OnlyIcons = Template.bind({});
OnlyIcons.args = {
  onlyShowIcon: true,
  options: [
    {
      value: true,
      label: 'Check',
      icon: 'check',
      tooltip: 'Yes',
    },
    {
      value: false,
      label: 'Close',
      icon: 'close',
      tooltip: 'No',
    },
  ],
};
