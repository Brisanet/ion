import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonInfoBadgeComponent } from '../projects/ion/src/lib/info-badge/info-badge.component';
import { IonSharedModule } from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Data Display/Info Badge',
  component: IonInfoBadgeComponent,
  argTypes: {
    iconSize: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: Story<IonInfoBadgeComponent> = (
  args: IonInfoBadgeComponent
) => ({
  component: IonInfoBadgeComponent,
  props: args,
  moduleMetadata: {
    imports: [CommonModule, IonSharedModule],
  },
});

export const Empty = Template.bind({});
Empty.args = {
  variant: 'primary',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: 'check-solid',
  variant: 'primary',
};

export const Positive = Template.bind({});
Positive.args = {
  icon: 'check-solid',
  variant: 'success',
};

export const Negative = Template.bind({});
Negative.args = {
  icon: 'close-solid',
  variant: 'negative',
};

export const Warning = Template.bind({});
Warning.args = {
  icon: 'exclamation-solid',
  variant: 'warning',
};

export const Info = Template.bind({});
Info.args = {
  icon: 'info-solid',
  variant: 'info',
};

export const WithText = Template.bind({});
WithText.args = {
  text: 'Lorem ipsum',
  variant: 'success',
};
