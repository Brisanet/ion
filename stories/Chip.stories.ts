import { BadgeComponent } from './../projects/ion/src/lib/badge/badge.component';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { ChipComponent } from '../projects/ion/src/lib/chip/chip.component';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { DropdownComponent } from '../projects/ion/src/lib/dropdown/dropdown.component';
import { InfoBadgeComponent } from '../projects/ion/src/lib/info-badge/info-badge.component';
import { InputComponent } from '../projects/ion/src/lib/input/input.component';
import { FormsModule } from '@angular/forms';

export default {
  title: 'Ion/Navigation/Chips',
  component: ChipComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
      declarations: [
        DropdownComponent,
        IonIconComponent,
        BadgeComponent,
        InfoBadgeComponent,
        InputComponent,
      ],
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
  options: [{ label: 'Cat' }, { label: 'Dog' }],
  icon: 'close',
  multiple: true,
};
