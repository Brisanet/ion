import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { IonTooltipComponent } from '../projects/ion/src/lib/tooltip/tooltip.component';
import { IonDatePickerModule } from '../projects/ion/src/public-api';
import { IonDatepickerComponent } from './../projects/ion/src/lib/picker/date-picker/date-picker.component';
import { CalendarDirection } from '../projects/ion/src/lib/core/types/datepicker';

const disabledDate = (currDate: Date): boolean => {
  const today = new Date();
  return currDate > today;
};

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
    imports: [CommonModule, IonDatePickerModule],
    entryComponents: [IonTooltipComponent],
  },
});

export const Basic = Template.bind({});
Basic.args = {};

export const RangePicker = Template.bind({});
RangePicker.args = {
  rangePicker: true,
};

export const RangerPickerWithPeriods = Template.bind({});
RangerPickerWithPeriods.args = {
  rangePicker: true,
  predefinedRanges: [
    { label: 'Últimos 7 dias', duration: 'P7D' },
    { label: 'Últimos 15 dias', duration: 'P15D' },
    { label: 'Últimos 30 dias', duration: 'P30D' },
  ],
};

export const WithDisabledDate = Template.bind({});
WithDisabledDate.args = {
  disabledDate,
  direction: CalendarDirection.bottomLeft,
};
