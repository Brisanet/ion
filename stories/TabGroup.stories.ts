import { Story, Meta } from '@storybook/angular/types-6-0';
import { TabGroupComponent } from '../projects/ion/src/lib/tab-group/tab-group.component';
import { moduleMetadata } from '@storybook/angular';
import { TabComponent } from '../projects/ion/src/lib/tab/tab.component';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Ion/TabGroup',
  component: TabGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      declarations: [TabComponent],
    }),
  ],
} as Meta;

// Mock tabs
const tabs = [];
for (let index = 1; index <= 8; index++) {
  tabs.push({
    name: 'Tab ' + index,
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
  tabs: tabs,
  selected: action('selected'),
};

export const Vertical = Template.bind({});
Vertical.args = {
  tabs: tabs,
  alignment: 'vertical',
  selected: action('selected'),
};

export const SelectedByDefault = Template.bind({});
SelectedByDefault.args = {
  tabs: [
    {
      name: 'Selected',
      selected: true,
    },
    {
      name: 'Not Selected',
      selected: false,
    },
  ],
  selected: action('selected'),
};
