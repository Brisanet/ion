import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { ButtonModule } from './../projects/ion/src/lib/button/button.module';
import { IonIndicatorComponent } from './../projects/ion/src/lib/indicator/indicator.component';
import { TooltipModule } from './../projects/ion/src/lib/tooltip/tooltip.module';

export default {
  title: 'Ion/Data Display/Indicator',
  component: IonIndicatorComponent,
} as Meta;

const Template: Story<IonIndicatorComponent> = (
  args: IonIndicatorComponent
) => ({
  component: IonIndicatorComponent,
  props: args,
  moduleMetadata: {
    declarations: [IonIndicatorComponent],
    imports: [CommonModule, ButtonModule, TooltipModule],
  },
});

export const Default = Template.bind({});
Default.args = {
  title: 'Título do Indicator',
  value: 1500,
  secondValue: '5%',
  buttonLabel: 'Detalhes',
};
