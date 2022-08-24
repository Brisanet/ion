import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { ChipComponent } from '../projects/ion/src/lib/chip/chip.component';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { DropdownComponent } from '../projects/ion/src/lib/dropdown/dropdown.component';

export default {
  title: 'Ion/Chips',
  component: ChipComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      declarations: [DropdownComponent, IonIconComponent],
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

export const WithDropdown = Template.bind({});
WithDropdown.args = {
  label: 'Custom label',
  options: [{ label: 'Cat' }, { label: 'Dog' }],
};
