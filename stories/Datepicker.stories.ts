import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { action } from '@storybook/addon-actions';
import { IonDividerComponent } from '../projects/ion/src/public-api';
import { DatePicker } from '../projects/ion/src/lib/picker/date-picker/date-picker-calendar/date-picker-calendar.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '../projects/ion/src/lib/button/button.module';

export default {
  title: 'Ion/Data Entry/Datepicker',
  component: DatePicker,
} as Meta;

const Template: Story<DatePicker> = (args: DatePicker) => ({
  component: DatePicker,
  props: { ...args, ionOnClick: action('ionOnClick') },
  moduleMetadata: {
    declarations: [IonDividerComponent],
    imports: [CommonModule, FormsModule, ButtonModule],
  },
});

export const Basic = Template.bind({});
Basic.args = {
  initialDate: '2022-10-28',
  lang: 'pt-BR',
};
