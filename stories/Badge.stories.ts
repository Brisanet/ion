import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { BadgeComponent } from '../projects/ion/src/lib/badge/badge.component';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';

export default {
  title: 'Ion/Data Display/Badge',
  component: BadgeComponent,
} as Meta;

const Template: Story<BadgeComponent> = (args: BadgeComponent) => ({
  component: BadgeComponent,
  props: args,
  moduleMetadata: {
    declarations: [IonIconComponent],
    imports: [CommonModule],
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
  label: 'Primary',
};

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  value: 100,
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
  value: 100,
};

export const Neutral = Template.bind({});
Neutral.args = {
  type: 'neutral',
  value: 100,
};

export const Negative = Template.bind({});
Negative.args = {
  type: 'negative',
  value: 100,
};
