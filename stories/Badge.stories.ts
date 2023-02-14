import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonBadgeComponent } from '../projects/ion/src/lib/badge/badge.component';
import { IonSharedModule } from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Data Display/Badge',
  component: IonBadgeComponent,
} as Meta;

const Template: Story<IonBadgeComponent> = (args: IonBadgeComponent) => ({
  component: IonBadgeComponent,
  props: args,
  moduleMetadata: {
    imports: [CommonModule, IonSharedModule],
  },
});

export const WithValue = Template.bind({});
WithValue.args = {
  type: 'primary',
  value: 10,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  type: 'primary',
  label: 'Badge',
};

export const BiggerValue = Template.bind({});
BiggerValue.args = {
  type: 'primary',
  value: 900,
};

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  label: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
  label: 'Secondary',
};

export const Neutral = Template.bind({});
Neutral.args = {
  type: 'neutral',
  label: 'Neutral',
};

export const Negative = Template.bind({});
Negative.args = {
  type: 'negative',
  label: 'Negative',
};
