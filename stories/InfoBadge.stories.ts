import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { InfoBadgeComponent } from '../projects/ion/src/lib/info-badge/info-badge.component';

export default {
  title: 'Ion/Data Display/Info Badge',
  component: InfoBadgeComponent,
  argTypes: {
    iconSize: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: Story<InfoBadgeComponent> = (args: InfoBadgeComponent) => ({
  component: InfoBadgeComponent,
  props: args,
  moduleMetadata: {
    declarations: [IonIconComponent],
    imports: [CommonModule],
  },
});

export const Empty = Template.bind({});
Empty.args = {
  variant: 'primary',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: 'check',
  variant: 'primary',
};

export const Positive = Template.bind({});
Positive.args = {
  icon: 'check',
  variant: 'positive',
};

export const Negative = Template.bind({});
Negative.args = {
  icon: 'close',
  variant: 'negative',
};

export const Warning = Template.bind({});
Warning.args = {
  icon: 'exclamation',
  variant: 'warning',
};

export const Info = Template.bind({});
Info.args = {
  icon: 'info',
  variant: 'info',
};

export const WithText = Template.bind({});
WithText.args = {
  text: 'Lorem ipsum',
  variant: 'positive',
};
