import { ChipGroupComponent } from '../projects/ion/src/lib/chip-group/chip-group.component';
import { BadgeComponent } from '../projects/ion/src/lib/badge/badge.component';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { ChipComponent } from '../projects/ion/src/lib/chip/chip.component';
import { DropdownModule } from '../projects/ion/src/lib/dropdown/dropdown.module';
import { InfoBadgeComponent } from '../projects/ion/src/lib/info-badge/info-badge.component';

export default {
  title: 'Ion/Navigation/ChipGroup',
  component: ChipGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [DropdownModule],
      declarations: [ChipComponent, BadgeComponent, InfoBadgeComponent],
    }),
  ],
} as Meta;

const chips = [];
for (let index = 1; index <= 8; index++) {
  chips.push({
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
