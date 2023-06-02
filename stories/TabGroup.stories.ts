import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { iconsPaths } from '../projects/ion/src/lib/icon/svgs/icons';
import { IonTabGroupComponent } from '../projects/ion/src/lib/tab-group/tab-group.component';
import { IonSharedModule } from '../projects/ion/src/lib/shared.module';
import { IonTabModule } from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Navigation/TabGroup',
  component: IonTabGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [IonSharedModule, IonTabModule],
    }),
  ],
} as Meta;

// Mock tabs
const tabs = [];
for (let index = 1; index <= 8; index++) {
  tabs.push({
    label: 'Tab ' + index,

    selected: false,
  });
}

const Template: Story<IonTabGroupComponent> = (args: IonTabGroupComponent) => ({
  component: IonTabGroupComponent,
  props: {
    ...args,
    selected: action('selected'),
  },
});

export const Horizontal = Template.bind({});
Horizontal.args = {
  tabs,

  selected: action('selected'),
};

export const HorizontalDisabled = Template.bind({});
HorizontalDisabled.args = {
  tabs: [...tabs, { label: 'disabled tab', disabled: true }],
  selected: action('selected'),
};

export const Vertical = Template.bind({});
Vertical.args = {
  tabs,
  direction: 'vertical',
  selected: action('selected'),
};

export const VerticalWithBorderLeft = Template.bind({});
VerticalWithBorderLeft.args = {
  tabs,
  border: 'left',
  direction: 'vertical',
  selected: action('selected'),
};

export const SelectedByDefault = Template.bind({});
SelectedByDefault.args = {
  tabs: [
    {
      label: 'Selected',
      selected: true,
    },
    {
      label: 'Not Selected',
      selected: false,
    },
  ],
  selected: action('selected'),
};

export const mediumSize = Template.bind({});
mediumSize.args = {
  tabs,
  direction: 'vertical',
  selected: action('selected'),
  size: 'md',
};

export const largeSize = Template.bind({});
largeSize.args = {
  tabs,
  direction: 'vertical',
  selected: action('selected'),
  size: 'lg',
};

export const differentSizes = Template.bind({});
differentSizes.args = {
  tabs: [
    {
      label: 'Selected',
      selected: true,
    },
    {
      label: 'Not Selected',
      selected: false,
    },
  ],
  direction: 'vertical',
  selected: action('selected'),
  size: 'lg',
};

export const tabsWithIcons = Template.bind({});
const tabsIcons = Object.keys(iconsPaths).map((icon) => {
  return {
    label: icon,
    selected: false,
    iconType: icon,
  };
});
tabsWithIcons.args = {
  tabs: tabsIcons,
  direction: 'vertical',
};

export const WithBadges = Template.bind({});
WithBadges.args = {
  tabs: [
    {
      label: 'With badge',
      selected: true,
      badge: {
        value: 20,
      },
    },
    {
      label: 'Without badge',
      selected: false,
    },
  ],
  selected: action('selected'),
};
