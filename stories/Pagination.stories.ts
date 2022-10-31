import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { PaginationComponent } from '../projects/ion/src/lib/pagination/pagination.component';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import {
  BadgeComponent,
  ButtonComponent,
  DropdownComponent,
} from '../projects/ion/src/public-api';
import { FormsModule } from '@angular/forms';

export default {
  title: 'Ion/Navigation/Pagination',
  component: PaginationComponent,
} as Meta;

const Template: Story<PaginationComponent> = (args: PaginationComponent) => ({
  component: PaginationComponent,
  props: { ...args, events: action('selected') },
  moduleMetadata: {
    declarations: [
      IonIconComponent,
      ButtonComponent,
      BadgeComponent,
      DropdownComponent,
    ],
    imports: [CommonModule, FormsModule],
  },
});

export const Basic = Template.bind({});
Basic.args = {
  total: 46,
  itemsPerPage: 10,
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  total: 46,
  size: 'sm',
  itemsPerPage: 10,
};

export const SelectItemPerPage = Template.bind({});
SelectItemPerPage.args = {
  total: 46,
  allowChangeQtdItems: true,
  itemsPerPage: 10,
};
