import { IonChipGroupComponent } from '../projects/ion/src/lib/chip-group/chip-group.component';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { FormsModule } from '@angular/forms';
import { IonChipGroupModule } from '../projects/ion/src/lib/chip-group/chip-group.module';

export default {
  title: 'Ion/Navigation/ChipGroup',
  component: IonChipGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, IonChipGroupModule],
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
    multiple: true,
  });
}

const Template: Story<IonChipGroupComponent> = (
  args: IonChipGroupComponent
) => ({
  component: IonChipGroupComponent,
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

export const RequiredSelected = Template.bind({});
RequiredSelected.args = {
  chips: [
    {
      label: 'Chip 1',
      selected: true,
    },
    {
      label: 'Chip 2',
      selected: false,
    },
  ],
  required: true,
  multiple: false,
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
