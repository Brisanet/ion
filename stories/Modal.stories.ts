import { Meta, Story } from '@storybook/angular/types-6-0';
import { ModalComponent } from '../projects/ion/src/lib/modal/modal.component';

export default {
  title: 'Ion/Data Display/Modal',
  component: ModalComponent,
} as Meta;

const Template: Story<ModalComponent> = () => ({
  component: ModalComponent,
});

export const Base = Template.bind({});
