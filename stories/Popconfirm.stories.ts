import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonInputComponent } from '../projects/ion/src/lib/input/input.component';
import { IonPopConfirmComponent } from '../projects/ion/src/lib/popconfirm/popconfirm.component';
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
  component: IonPopConfirmComponent,
} as Meta;

const Template: Story<IonPopConfirmComponent> = (
  args: IonPopConfirmComponent
) => ({
  component: IonPopConfirmComponent,
  props: args,
  moduleMetadata: {
    declarations: [
      IonDividerComponent,
      IonButtonComponent,
      IonIconComponent,
      IonBadgeComponent,
      IonDropdownComponent,
      IonAlertComponent,
      IonInputComponent,
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
