import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular';
import { IonAvatarComponent } from '../projects/ion/src/lib/avatar/avatar.component';
import { DefaultImageDirective } from '../projects/ion/src/lib/defaultImage.directive';
import { IonSharedModule } from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Data Display/Avatar',
  component: IonAvatarComponent,
} as Meta;

const Template: Story<IonAvatarComponent> = (args: IonAvatarComponent) => ({
  component: IonAvatarComponent,
  props: args,
  moduleMetadata: {
    declarations: [IonAvatarComponent, DefaultImageDirective],
    imports: [CommonModule, IonSharedModule],
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
  onErrorImage: require('./assets/default.svg'),
};

export const PhotoDefault = Template.bind({});
PhotoDefault.args = {
  type: 'photo',
  image: 'default.svg',
  onErrorImage: require('./assets/default.svg'),
};
