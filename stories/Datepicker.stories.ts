import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonButtonModule } from '../projects/ion/src/lib/button/button.module';
import { IonDividerModule } from '../projects/ion/src/lib/divider/divider.module';
import { IonInputModule } from '../projects/ion/src/lib/input/input.module';
import { IonTooltipComponent } from '../projects/ion/src/lib/tooltip/tooltip.component';
import { IonTooltipModule } from '../projects/ion/src/public-api';
import { IonControlPickerComponent } from './../projects/ion/src/lib/picker/control-picker/control-picker.component';
import { IonDatePickerCalendarComponent } from './../projects/ion/src/lib/picker/date-picker/date-picker-calendar/date-picker-calendar.component';
import { IonDatePickerInputComponent } from './../projects/ion/src/lib/picker/date-picker/date-picker-input/date-picker-input.component';
import { IonDatepickerComponent } from './../projects/ion/src/lib/picker/date-picker/date-picker.component';

export default {
  title: 'Ion/Data Entry/Datepicker',
  component: IonDatepickerComponent,
  parameters: {
    docs: true,
  },
} as Meta;

const Template: Story<IonDatepickerComponent> = (
  args: IonDatepickerComponent
) => ({
  component: IonDatepickerComponent,
  props: { ...args, ionOnClick: action('ionOnClick') },
  moduleMetadata: {
    declarations: [
      IonDatepickerComponent,
      IonControlPickerComponent,
      IonDatePickerInputComponent,
      IonDatePickerCalendarComponent,
    ],
    imports: [
      CommonModule,
      IonButtonModule,
      IonDividerModule,
      IonInputModule,
      IonTooltipModule,
    ],
    entryComponents: [IonTooltipComponent],
  },
});

export const Basic = Template.bind({});
Basic.args = {};

export const RangePicker = Template.bind({});
RangePicker.args = {
  rangePicker: true,
};
