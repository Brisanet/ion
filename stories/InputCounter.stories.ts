import { Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata, Story } from '@storybook/angular';
import { InputCounterComponent } from '../projects/ion/src/lib/input-counter/input-counter.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '../projects/ion/src/lib/button/button.module';

export default {
  title: 'Ion/Data Entry/Input-Counter',
  component: InputCounterComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, ButtonModule],
      declarations: [],
    }),
  ],
} as Meta;

const Template: Story<InputCounterComponent> = (
  args: InputCounterComponent
) => ({
  component: InputCounterComponent,
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
