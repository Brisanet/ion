import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonDropdownComponent } from '../projects/ion/src/lib/dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { IonSharedModule } from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Navigation/Dropdown',
  component: IonDropdownComponent,
} as Meta;

const Template: Story<IonDropdownComponent> = (args: IonDropdownComponent) => ({
  component: IonDropdownComponent,
  props: {
    ...args,
    selected: action('selected'),
    searchChange: action('searchChange'),
    scrollFinal: action('scrollFinal'),
  },
  moduleMetadata: {
    imports: [CommonModule, FormsModule, IonSharedModule],
  },
});

const options = [];
const createOptions = (): void => {
  for (let index = 1; index <= 9; index++) {
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

export const OptionWithIcon = Template.bind({});
OptionWithIcon.args = {
  options: [
    { label: 'Encomendas', selected: false, icon: 'box' },
    { label: 'Bancos', selected: false, icon: 'bank' },
    { label: 'Conquistas', selected: false, icon: 'award' },
  ],
};

export const NoData = Template.bind({});
NoData.args = {
  options: [],
  noDataConfig: {
    label: 'Dados? Fugiram em férias!',
    iconType: 'exclamation-rounded',
  },
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

const optionsWithRequired = [
  { label: 'Dog', selected: false },
  { label: 'Cat', selected: false },
  { label: 'Horse', selected: true },
];

export const MultipleSelect = Template.bind({});
MultipleSelect.args = {
  options: optionsWithMultiple,
  multiple: true,
  selected: action('selected'),
  optionsScroll: action('optionsScroll'),
};

export const WithSearch = Template.bind({});
WithSearch.args = {
  enableSearch: true,
  options,
  arraySelecteds: [
    { label: 'Option 1', selected: true },
    { label: 'Option 1', selected: true },
  ],
  scrollFinal: action('scrollFinal'),
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

export const RequiredOption = Template.bind({});
RequiredOption.args = {
  options: optionsWithRequired,
  required: true,
  selected: action('selected'),
  optionsScroll: action('optionsScroll'),
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  options,
  description: 'Example Title',
};

export const WithDescriptionAndSearch = Template.bind({});
WithDescriptionAndSearch.args = {
  description: 'Example Title',
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

export const WithLoading = Template.bind({});
WithLoading.args = {
  options: optionsWithMultiple,
  loading: true,
};
