import { ButtonComponent } from './../projects/ion/src/lib/button/button.component';
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { InputComponent } from '../projects/ion/src/lib/input/input.component';
import { DropdownComponent } from '../projects/ion/src/lib/dropdown/dropdown.component';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { FormsModule } from '@angular/forms';
import { BadgeComponent } from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Navigation/Dropdown',
  component: DropdownComponent,
} as Meta;

const Template: Story<DropdownComponent> = (args: DropdownComponent) => ({
  component: DropdownComponent,
  props: {
    ...args,
    selected: action('selected'),
    searchChange: action('searchChange'),
  },
  moduleMetadata: {
    declarations: [
      IonIconComponent,
      InputComponent,
      ButtonComponent,
      BadgeComponent,
    ],
    imports: [CommonModule, FormsModule],
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

export const WithSearch = Template.bind({});
WithSearch.args = {
  enableSearch: true,
  options,
};

export const WithCustomSearch = Template.bind({});
WithCustomSearch.args = {
  enableSearch: true,
  options,
  searchOptions: {
    iconDirection: 'left',
    placeholder: 'Busque por algo...',
  },
};

export const WithCleanSearch = Template.bind({});
WithCleanSearch.args = {
  enableSearch: true,
  options,
  searchOptions: {
    inputType: 'text',
    iconInput: 'search',
    iconDirection: 'right',
    clearButton: true,
    placeholder: 'Busque por algo...',
  },
};
