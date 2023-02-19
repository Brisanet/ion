import { TooltipDirective } from './../projects/ion/src/lib/tooltip/tooltip.directive';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { action } from '@storybook/addon-actions';
import {
  IonDatepickerComponent,
  DatePickerComponentProps,
} from './../projects/ion/src/lib/picker/date-picker/date-picker.component';
import { DatePickerCalendarComponent } from './../projects/ion/src/lib/picker/date-picker/date-picker-calendar/date-picker-calendar.component';
import { DatePickerInputComponent } from './../projects/ion/src/lib/picker/date-picker/date-picker-input/date-picker-input.component';
import { ControlPickerComponent } from './../projects/ion/src/lib/picker/control-picker/control-picker.component';
import { IonDividerComponent } from '../projects/ion/src/public-api';
import { TooltipComponent } from './../projects/ion/src/lib/tooltip/tooltip.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../projects/ion/src/lib/button/button.module';

export default {
  title: 'Ion/Data Entry/Datepicker',
  component: IonDatepickerComponent,
} as Meta;

const Template: Story<IonDatepickerComponent> = (
  args: DatePickerComponentProps
) => ({
  component: IonDatepickerComponent,
  props: { ...args, ionOnClick: action('ionOnClick') },
  moduleMetadata: {
    declarations: [
      IonDatepickerComponent,
      ControlPickerComponent,
      DatePickerInputComponent,
      DatePickerCalendarComponent,
      IonDividerComponent,
      TooltipComponent,
      TooltipDirective,
    ],
    imports: [CommonModule, ButtonModule],
    entryComponents: [TooltipComponent],
  },
});

export const Basic = Template.bind({});
Basic.args = {};
