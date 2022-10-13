import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { action } from '@storybook/addon-actions';
import {
  ButtonComponent,
  DropdownComponent,
  IonDividerComponent,
} from '../projects/ion/src/public-api';
import { DatePickerComponent } from '../projects/ion/src/lib/date-picker/date-picker/date-picker.component';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';

export default {
  title: 'Ion/Data Entry/Datepicker',
  component: DatePickerComponent,
} as Meta;

const Template: Story<DatePickerComponent> = (args: DatePickerComponent) => ({
  component: DatePickerComponent,
  props: { ...args, ionOnClick: action('ionOnClick') },
  moduleMetadata: {
    declarations: [
      ButtonComponent,
      IonIconComponent,
      DropdownComponent,
      IonDividerComponent,
    ],
    imports: [CommonModule],
  },
});

export const Basic = Template.bind({});
Basic.args = {
  initialDate: '2022-01-04',
  lang: 'pt-BR',
};
