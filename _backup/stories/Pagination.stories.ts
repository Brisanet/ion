import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonButtonModule } from '../projects/ion/src/lib/button/button.module';
import { IonPaginationComponent } from '../projects/ion/src/lib/pagination/pagination.component';

export default {
  title: 'Ion/Navigation/Pagination',
  component: IonPaginationComponent,
} as Meta;

const Template: Story<IonPaginationComponent> = (
  args: IonPaginationComponent
) => ({
  component: IonPaginationComponent,
  props: { ...args, events: action('selected') },
  moduleMetadata: {
    declarations: [],
    imports: [CommonModule, FormsModule, IonButtonModule],
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
  pageSizeOptions: [10, 20, 30, 40, 46],
};
