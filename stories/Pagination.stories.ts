import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { PaginationComponent } from '../projects/ion/src/lib/pagination/pagination.component';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { ButtonComponent } from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Navigation/Pagination',
  component: PaginationComponent,
} as Meta;

const Template: Story<PaginationComponent> = (args: PaginationComponent) => ({
  component: PaginationComponent,
  props: args,
  moduleMetadata: {
    declarations: [IonIconComponent, ButtonComponent],
    imports: [CommonModule],
  },
});

export const Basic = Template.bind({});
Basic.args = {
  total: 46,
};
