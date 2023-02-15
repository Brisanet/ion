import { Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata, Story } from '@storybook/angular';
import { IonInputCounterComponent } from '../projects/ion/src/lib/input-counter/input-counter.component';
import { FormsModule } from '@angular/forms';
import { IonButtonModule } from '../projects/ion/src/lib/button/button.module';

export default {
  title: 'Ion/Data Entry/Input-Counter',
  component: IonInputCounterComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, IonButtonModule],
      declarations: [],
    }),
  ],
} as Meta;

const Template: Story<IonInputCounterComponent> = (
  args: IonInputCounterComponent
) => ({
  component: IonInputCounterComponent,
  props: args,
});

export const Small = Template.bind({});
Small.args = {
  InputSize: 'sm',
};

export const Medium = Template.bind({});
Medium.args = {
  InputSize: 'md',
};
