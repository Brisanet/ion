import { Meta, Story } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { IonLinkComponent } from '../projects/ion/src/lib/link/link.component';
import { IonLinkModule } from '../projects/ion/src/public-api';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Ion/Navigation/Link',
  component: IonLinkComponent,
} as Meta;

const Template: Story<IonLinkComponent> = (args: IonLinkComponent) => ({
  component: IonLinkComponent,
  props: { ...args, ionOnCLick: action('click') },
  moduleMetadata: {
    imports: [CommonModule, IonLinkModule],
    entryComponents: [IonLinkComponent],
  },
});

export const Default = Template.bind({});
Default.args = {
  label: 'Link',
  link: 'https://github.com/',
  target: '_blank',
};

export const WithoutLink = Template.bind({});
WithoutLink.args = {
  label: 'Link',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  label: 'Link',
  link: 'https://github.com/',
  icon: 'box',
};

export const WithLeftIcon = Template.bind({});
WithLeftIcon.args = {
  label: 'Link',
  link: 'https://github.com/',
  icon: 'box',
  iconSide: 'left',
};

export const IconOnly = Template.bind({});
IconOnly.args = {
  link: 'https://github.com/',
  icon: 'box',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Link',
  link: 'fakelink',
  disabled: true,
};

export const DisabledWithIcon = Template.bind({});
DisabledWithIcon.args = {
  label: 'Link',
  link: 'fakelink',
  icon: 'box',
  disabled: true,
};

export const DisabledIconOnly = Template.bind({});
DisabledIconOnly.args = {
  link: 'fakelink',
  icon: 'box',
  disabled: true,
};
