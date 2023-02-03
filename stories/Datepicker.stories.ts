import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { action } from '@storybook/addon-actions';
import {
  IonDividerComponent,
  IonSharedModule,
} from '../projects/ion/src/public-api';
import { IonDatePickerComponent } from '../projects/ion/src/lib/date-picker/date-picker/date-picker.component';
import { FormsModule } from '@angular/forms';

export default {
  title: 'Ion/Data Entry/Datepicker',
  component: IonDatePickerComponent,
} as Meta;

const Template: Story<IonDatePickerComponent> = (
  args: IonDatePickerComponent
) => ({
  component: IonDatePickerComponent,
  props: { ...args, ionOnClick: action('ionOnClick') },
  moduleMetadata: {
    declarations: [IonDividerComponent],
    imports: [CommonModule, FormsModule, IonSharedModule],
  },
});

export const Basic = Template.bind({});
Basic.args = {
  initialDate: '2022-10-28',
  lang: 'pt-BR',
};
