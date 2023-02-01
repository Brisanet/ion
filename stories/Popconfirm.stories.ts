import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { InputComponent } from '../projects/ion/src/lib/input/input.component';
import { PopConfirmComponent } from '../projects/ion/src/lib/popconfirm/popconfirm.component';
import {
  IonAlertComponent,
  IonBadgeComponent,
  IonButtonComponent,
  IonDropdownComponent,
  IonDividerComponent,
  IonIconComponent,
} from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Data Display/PopConfirm',
  component: PopConfirmComponent,
} as Meta;

const Template: Story<PopConfirmComponent> = (args: PopConfirmComponent) => ({
  component: PopConfirmComponent,
  props: args,
  moduleMetadata: {
    declarations: [
      IonDividerComponent,
      IonButtonComponent,
      IonIconComponent,
      IonBadgeComponent,
      IonDropdownComponent,
      IonAlertComponent,
      InputComponent,
    ],
    imports: [CommonModule, FormsModule],
  },
});

export const Default = Template.bind({});
Default.args = {
  ionPopConfirmTitle: 'Você tem certeza?',
};

export const withDescription = Template.bind({});
withDescription.args = {
  ionPopConfirmTitle: 'Você tem certeza?',
  ionPopConfirmDesc:
    'Ao concluir essa ação as ordens de serviço alocadas para o recurso ficarão órfãs.',
};
