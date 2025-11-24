import { IonSelectComponent } from '../projects/ion/src/lib/select/select.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonSelectItemComponent } from '../projects/ion/src/lib/select/select-item/select-item.component';
import { moduleMetadata } from '@storybook/angular/dist/ts3.9/client';
import {
  IonDropdownModule,
  IonIconModule,
} from '../projects/ion/src/public-api';
import { FormsModule } from '@angular/forms';
import { IonSelectProps } from '../projects/ion/src/lib/core/types/select';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Ion/Data Entry/Select',
  Component: IonSelectComponent,
  argTypes: {
    mode: {
      options: ['default', 'multiple'],
      control: { type: 'select' },
      defaultValue: 'default',
    },
  },
  decorators: [
    moduleMetadata({
      declarations: [IonSelectComponent, IonSelectItemComponent],
      imports: [IonIconModule, FormsModule, IonDropdownModule],
    }),
  ],
} as Meta;

const fruitOptions: IonSelectProps['options'] = [
  { label: 'Apple', selected: false },
  { label: 'Banana', selected: false },
  { label: 'Grape', selected: false },
];

const moreFruitOptions: IonSelectProps['options'] = [
  { label: 'Apple', selected: false },
  { label: 'Banana', selected: false },
  { label: 'Grape', selected: false },
  { label: 'Orange', selected: false },
  { label: 'Lemon', selected: false },
  { label: 'Avocado', selected: false },
  { label: 'Watermelon', selected: false },
  { label: 'Melon', selected: false },
  { label: 'Strawberry', selected: false },
];

const Template: Story<IonSelectComponent> = (args: IonSelectProps) => ({
  component: IonSelectComponent,
  props: { ...args, search: action('search'), events: action('events') },
});

export const Default = Template.bind({});

Default.args = {
  options: fruitOptions,
  placeholder: 'Select 3 fruits',
};

export const MultipleMax3 = Template.bind({});

MultipleMax3.args = {
  options: moreFruitOptions,
  placeholder: 'Select 3 fruits',
  mode: 'multiple',
  maxSelected: 3,
};

export const Required = Template.bind({});
Required.args = {
  options: fruitOptions,
  placeholder: 'Select 3 fruits',
  required: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  options: fruitOptions,
  placeholder: 'Select 3 fruits',
  disabled: true,
};

export const DisabledSelectedOptions = Template.bind({});
DisabledSelectedOptions.args = {
  options: [
    ...fruitOptions,
    { label: 'Melon', selected: true },
    { label: 'Avocado', selected: true },
    { label: 'Strawberry', selected: true },
  ],
  placeholder: 'Select 3 fruits',
  disabled: true,
};

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  options: [
    { name: 'Custom Option 1', selected: false },
    { name: 'Custom Option 2', selected: false },
    { name: 'Custom Option 3', selected: false },
  ],
  placeholder: 'Select a option',
  propLabel: 'name',
};
