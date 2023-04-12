import { Meta, Story } from '@storybook/angular/types-6-0';
import { action } from '@storybook/addon-actions';
import { IonDatepickerComponent } from './../projects/ion/src/lib/picker/date-picker/date-picker.component';
import { IonDatePickerCalendarComponent } from './../projects/ion/src/lib/picker/date-picker/date-picker-calendar/date-picker-calendar.component';
import { IonDatePickerInputComponent } from './../projects/ion/src/lib/picker/date-picker/date-picker-input/date-picker-input.component';
import { IonControlPickerComponent } from './../projects/ion/src/lib/picker/control-picker/control-picker.component';
import { CommonModule } from '@angular/common';
import { IonButtonModule } from '../projects/ion/src/lib/button/button.module';
import { IonDividerModule } from '../projects/ion/src/lib/divider/divider.module';
import { IonInputModule } from '../projects/ion/src/lib/input/input.module';
import { IonTooltipComponent } from '../projects/ion/src/lib/tooltip/tooltip.component';
import { IonTooltipModule } from '../projects/ion/src/public-api';
import { IonDatePickerComponentProps } from 'ion/lib/core/types/datepicker';

export default {
  title: 'Ion/Data Entry/Datepicker',
  component: IonDatepickerComponent,
} as Meta;

const Template: Story<IonDatepickerComponent> = (
  args: IonDatePickerComponentProps
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
