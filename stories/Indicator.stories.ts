import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular';
import { link } from 'fs';
import { IndicatorComponent } from '../projects/ion/src/lib/indicator/indicator.component';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
export default {
  title: 'Ion/Data Display/Indicator',
  component: IndicatorComponent,
} as Meta;
const Template: Story<IndicatorComponent> = (args: IndicatorComponent) => ({
  component: IndicatorComponent,
  props: args,
  moduleMetadata: {
    declarations: [IonIconComponent, IndicatorComponent],
    imports: [CommonModule],
  },
});

export const Initials = Template.bind({});
Initials.args = {
  label: 'Recuperável',
  icon: 'technical',
  iconbody: 'close',
  type: 'info-solid',
  value: '2.800',
  valueicon: 'right2',
  color: '#6e7192',
  percent: '30',
};

export const withoutPercent = Template.bind({});
withoutPercent.args = {
  label: 'Recuperável',
  icon: 'technical',
  iconbody: 'close',
  type: 'info-solid',
  value: '2.800',
  valueicon: 'right2',
  color: '#6e7192',
};
