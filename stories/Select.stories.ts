import { IonSelectComponent } from '../projects/ion/src/lib/select/select.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  IonDropdownModule,
  IonInputModule,
} from '../projects/ion/src/public-api';
import { DropdownItem } from '../projects/ion/src/lib/core/types/dropdown';

export default {
  title: 'Ion/Data Entry/Select',
  Component: IonSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [IonInputModule, IonDropdownModule],
    }),
  ],
} as Meta;

const Template: Story<IonSelectComponent> = (args: IonSelectComponent) => ({
  component: IonSelectComponent,
  props: {
    ...args,
    selected: action('selected'),
    searchChange: action('searchChange'),
  },
});

const options: DropdownItem[] = [
  { label: 'apples', disabled: true },
  { label: 'oranges' },
  { label: 'bananas' },
];

export const Basic = Template.bind({});
Basic.args = {
  placeholder: 'Choose a fruit',
  options,
  showDropdown: false,
  showToggle: false,
  enableSearch: true,
  enableFilteringOptions: true,
};
