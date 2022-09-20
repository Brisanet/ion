import { BadgeComponent } from './../projects/ion/src/lib/badge/badge.component';
import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { iconsPaths } from '../projects/ion/src/lib/icon/svgs/icons';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { TabGroupComponent } from '../projects/ion/src/lib/tab-group/tab-group.component';
import { TabComponent } from '../projects/ion/src/lib/tab/tab.component';

export default {
  title: 'Ion/Navigation/TabGroup',
  component: TabGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      declarations: [TabComponent, IonIconComponent, BadgeComponent],
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

const Template: Story<TabGroupComponent> = (args: TabGroupComponent) => ({
  component: TabGroupComponent,
  props: {
    ...args,
    selected: action('selected'),
  },
});

export const Horizontal = Template.bind({});
Horizontal.args = {
  tabs,
  border: 'bottom',
  selected: action('selected'),
};

export const Vertical = Template.bind({});
Vertical.args = {
  tabs,
  border: 'right',
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
  border: 'bottom',
  selected: action('selected'),
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
  border: 'right',
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
  border: 'right',
  direction: 'vertical',
};
