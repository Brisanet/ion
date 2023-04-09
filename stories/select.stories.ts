import { DropdownItem } from './../dist/ion/lib/core/types/dropdown.d';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular/dist/ts3.9/client';
import { IonSelectComponent } from './../projects/ion/src/lib/select/select.component';
import { IonInputModule } from './../projects/ion/src/lib/input/input.module';
import { IonDropdownModule } from './../projects/ion/src/lib/dropdown/dropdown.module';
import { IonSelectProps } from 'projects/ion/src/lib/core/types/select';

export default {
  title: 'Ion/Data Entry/Select',
  Component: IonSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [IonInputModule, IonDropdownModule],
    }),
  ],
} as Meta;

const Template: Story<IonSelectComponent> = (args: IonSelectProps) => ({
  component: IonSelectComponent,
  props: args,
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
  disableVisibilityToggle: false,
} as IonSelectProps;
