import { ChipGroupComponent } from '../projects/ion/src/lib/chip-group/chip-group.component';
import { BadgeComponent } from '../projects/ion/src/lib/badge/badge.component';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { ChipComponent } from '../projects/ion/src/lib/chip/chip.component';
import { InfoBadgeComponent } from '../projects/ion/src/lib/info-badge/info-badge.component';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { DropdownComponent } from '../projects/ion/src/lib/dropdown/dropdown.component';
import { InputComponent } from '../projects/ion/src/lib/input/input.component';
import { ButtonComponent } from '../projects/ion/src/lib/button/button.component';
import { FormsModule } from '@angular/forms';

export default {
  title: 'Ion/Navigation/ChipGroup',
  component: ChipGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
      declarations: [
        ChipComponent,
        BadgeComponent,
        IonIconComponent,
        DropdownComponent,
        InputComponent,
        ButtonComponent,
        InfoBadgeComponent,
      ],
    }),
  ],
} as Meta;

const chips = [];
for (let index = 1; index <= 8; index++) {
  chips.push({
    label: 'Chip ' + index,
    selected: false,
  });
}

const chipsWithOptions = [];
for (let index = 1; index <= 8; index++) {
  chipsWithOptions.push({
    label: 'Chip ' + index,
    selected: false,
    options: [{ label: 'item ' + index }, { label: 'item ' + (index + 1) }],
  });
}

const Template: Story<ChipGroupComponent> = (args: ChipGroupComponent) => ({
  component: ChipGroupComponent,
  props: {
    ...args,
  },
});

export const Basic = Template.bind({});
Basic.args = {
  chips,
};

export const SelectedByDefault = Template.bind({});
SelectedByDefault.args = {
  chips: [
    {
      label: 'Chip 1',
      selected: true,
    },
    {
      label: 'Chip 2',
      selected: false,
    },
    {
      label: 'Chip 2',
      selected: false,
    },
  ],
};

export const Multiple = Template.bind({});
Multiple.args = {
  chips,
  multiple: true,
};

export const disableDefault = Template.bind({});
disableDefault.args = {
  chips,
  disabled: true,
};

export const smallSize = Template.bind({});
smallSize.args = {
  chips,
  size: 'sm',
};

export const mediumSize = Template.bind({});
mediumSize.args = {
  chips,
  size: 'md',
};

export const differentSizes = Template.bind({});
differentSizes.args = {
  chips: [
    {
      label: 'Chip 1',
      selected: false,
      size: 'sm',
    },
    {
      label: 'Chip 2',
      selected: false,
      size: 'md',
    },
    {
      label: 'Chip 2',
      selected: false,
      size: 'sm',
    },
  ],
};

export const WithDropdown = Template.bind({});
WithDropdown.args = {
  chips: chipsWithOptions,
};
