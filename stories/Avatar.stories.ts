import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular';
import { AvatarComponent } from '../projects/ion/src/lib/avatar/avatar.component';
import { DefaultImageDirective } from '../projects/ion/src/lib/defaultImage.directive';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';

export default {
  title: 'Ion/Data Display/Avatar',
  component: AvatarComponent,
} as Meta;

const Template: Story<AvatarComponent> = (args: AvatarComponent) => ({
  component: AvatarComponent,
  props: args,
  moduleMetadata: {
    declarations: [AvatarComponent, IonIconComponent, DefaultImageDirective],
    imports: [CommonModule],
  },
});

export const Initials = Template.bind({});
Initials.args = {
  type: 'initials',
  value: 'Taylor Swift',
};

export const Icon = Template.bind({});
Icon.args = {
  type: 'icon',
};

export const Photo = Template.bind({});
Photo.args = {
  type: 'photo',
  image:
    'https://64.media.tumblr.com/40e2174ab5e68b1eabbc3dfc78607cef/c1effc67d5c3a1fd-20/s540x810/9d6ce72fcddf97841e7410a0652dd9d5f018b35d.pnj',
};

export const PhotoDefault = Template.bind({});
PhotoDefault.args = {
  type: 'photo',
  image: 'not_found.png',
  onErrorImage:
    'https://gw.alipayobjects.com/zos/antfincdn/4zAaozCvUH/unexpand.svg',
};
