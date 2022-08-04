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
  alignment: 'vertical',
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
  alignment: 'vertical',
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
  ],
  alignment: 'vertical',
};
