import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { IonTooltipComponent } from '../projects/ion/src/lib/tooltip/tooltip.component';
import { IonDatePickerModule } from '../projects/ion/src/public-api';
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
