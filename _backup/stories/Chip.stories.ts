import {
  IonSharedModule,
  IonInfoBadgeModule,
} from '../projects/ion/src/public-api';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { ChipComponent } from '../projects/ion/src/lib/chip/chip.component';
import { FormsModule } from '@angular/forms';

export default {
  title: 'Ion/Navigation/Chips',
  component: ChipComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, IonSharedModule, IonInfoBadgeModule],
    }),
  ],
} as Meta;

const Template: Story<ChipComponent> = (args: ChipComponent) => ({
  component: ChipComponent,
  props: args,
});

export const Basic = Template.bind({});
Basic.args = {
  label: 'Custom label',
};

export const ChipSmall = Template.bind({});
ChipSmall.args = {
  label: 'Small',
  size: 'sm',
};

export const ChipMedium = Template.bind({});
ChipMedium.args = {
  label: 'Medium',
  size: 'md',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled',
  disabled: true,
};

export const Selected = Template.bind({});
Selected.args = {
  label: 'Selected',
  selected: true,
};

export const BasicIcon = Template.bind({});
BasicIcon.args = {
  label: 'Custom label',
  icon: 'close',
};

export const ChipWithInfoBadge = Template.bind({});
ChipWithInfoBadge.args = {
  label: '09:00 - 12:00',
  infoBadge: 'warning',
};

export const ChipWithRightBadge = Template.bind({});
ChipWithRightBadge.args = {
  label: 'With Right Badge',
  rightBadge: {
    label: 'novo',
    type: 'negative',
  },
};

export const WithDropdown = Template.bind({});
WithDropdown.args = {
  label: 'Animais',
  options: [
    { label: 'Cat' },
    { label: 'Dog' },
    { label: 'Monkey' },
    { label: 'Human' },
    { label: 'Bird' },
    { label: 'Fish' },
    { label: 'Goat' },
    { label: 'Lion' },
    { label: 'Tiger' },
  ],
  icon: 'close',
  multiple: true,
};

export const WithDropdownAndIcon = Template.bind({});
WithDropdownAndIcon.args = {
  label: 'Animais',
  options: [
    { label: 'Cat', icon: 'access' },
    { label: 'Dog', icon: 'block' },
    { label: 'Monkey', icon: 'award' },
    { label: 'Human', icon: 'battery-charging' },
    { label: 'Bird', icon: 'camera2' },
    { label: 'Fish', icon: 'car' },
    { label: 'Goat', icon: 'check-user' },
    { label: 'Lion', icon: 'change' },
    { label: 'Tiger', icon: 'box' },
  ],
  multiple: false,
};

export const WithItemAlreadySelected = Template.bind({});
WithItemAlreadySelected.args = {
  label: 'Animais',
  options: [
    { label: 'Cat', selected: true },
    { label: 'Dog' },
    { label: 'Monkey' },
    { label: 'Human' },
    { label: 'Bird' },
    { label: 'Fish' },
    { label: 'Goat' },
    { label: 'Lion' },
    { label: 'Tiger' },
  ],
  icon: 'close',
  multiple: true,
};

export const WithDropdownWithSearch = Template.bind({});
WithDropdownWithSearch.args = {
  label: 'Animais',
  options: [{ label: 'Cat' }, { label: 'Dog' }],
  icon: 'close',
  dropdownSearchConfig: {
    enableSearch: true,
    searchOptions: {
      placeholder: 'Busque um animal',
    },
  },
};

export const ChipRequired = Template.bind({});
ChipRequired.args = {
  label: 'Animais',
  options: [{ label: 'Cat' }, { label: 'Dog' }],
  icon: 'close',
  required: true,
};
