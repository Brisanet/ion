import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { TabGroupComponent } from '../projects/ion/src/lib/tab-group/tab-group.component';
import { TabComponent } from '../projects/ion/src/lib/tab/tab.component';

export default {
  title: 'Ion/TabGroup',
  component: TabGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      declarations: [TabComponent, IonIconComponent],
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
  selected: action('selected'),
};

export const Vertical = Template.bind({});
Vertical.args = {
  tabs,
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
};

export const tabsWithIcons = Template.bind({});
tabsWithIcons.args = {
  tabs: [
    {
      label: 'Pencil',
      selected: true,
      iconType: 'pencil',
    },
    {
      label: 'Trash',
      selected: false,
      iconType: 'trash',
    },
    {
      label: 'Close',
      selected: false,
      iconType: 'close',
    },
    {
      label: 'Close Solid',
      selected: false,
      iconType: 'close-solid',
    },
    {
      label: 'Plus Solid',
      selected: false,
      iconType: 'plus-solid',
    },
    {
      label: 'Exclamation Solid',
      selected: false,
      iconType: 'exclamation-solid',
    },
    {
      label: 'Info Solid',
      selected: false,
      iconType: 'info-solid',
    },
    {
      label: 'Check Solid',
      selected: false,
      iconType: 'check-solid',
    },
    {
      label: 'Clock Solid',
      selected: false,
      iconType: 'clock-solid',
    },
    {
      label: 'Star Solid',
      selected: false,
      iconType: 'star-solid',
    },
  ],
  direction: 'vertical',
};
