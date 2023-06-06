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
  props: { ...args },
});

export const Default = Template.bind({});

Default.args = {
  options: fruitOptions,
  placeholder: 'Choose a fruit',
};

export const Multiple = Template.bind({});

Multiple.args = {
  options: moreFruitOptions,
  placeholder: 'Choose a fruit',
  mode: 'multiple',
  maxSelected: 3,
};
