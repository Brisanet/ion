import { IonIconComponent } from './../projects/ion/src/lib/icon/icon.component';
import { ButtonComponent } from './../projects/ion/src/lib/button/button.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { ModalComponent } from '../projects/ion/src/lib/modal/modal.component';
import { CommonModule } from '@angular/common';

export default {
  title: 'Ion/Data Display/Modal',
  component: ModalComponent,
} as Meta;

const Template: Story<ModalComponent> = () => ({
  component: ModalComponent,
  moduleMetadata: {
    declarations: [ButtonComponent, IonIconComponent],
    imports: [CommonModule],
  },
});

export const Base = Template.bind({});
