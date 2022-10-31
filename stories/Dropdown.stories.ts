import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { DropdownComponent } from '../projects/ion/src/lib/dropdown/dropdown.component';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';

export default {
  title: 'Ion/Navigation/Dropdown',
  component: DropdownComponent,
} as Meta;

const Template: Story<DropdownComponent> = (args: DropdownComponent) => ({
  component: DropdownComponent,
  props: { ...args, selected: action('selected') },
  moduleMetadata: {
    declarations: [IonIconComponent],
    imports: [CommonModule],
  },
});

const options = [];
const createOptions = (): void => {
  for (let index = 1; index <= 4; index++) {
    options.push({
      label: `Option ${index}`,
      selected: false,
    });
  }
};
createOptions();

export const Basic = Template.bind({});
Basic.args = {
  options,
};

export const DisabledSelected = Template.bind({});
DisabledSelected.args = {
  options: [
    {
      label: `Disabled`,
      selected: true,
      disabled: true,
    },
    ...options,
  ],
};

const optionsWithMultiple = [
  { label: 'Dog', selected: true },
  { label: 'Cat', selected: false },
  { label: 'Horse', selected: true },
];

export const MultipleSelect = Template.bind({});
MultipleSelect.args = {
  options: optionsWithMultiple,
  multiple: true,
  selected: action('selected'),
};
