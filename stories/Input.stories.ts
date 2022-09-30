import { FormsModule } from '@angular/forms';
import { InputComponent } from '../projects/ion/src/lib/input/input.component';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';

export default {
  title: 'Ion/Data Entry/Input',
  component: InputComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
      declarations: [IonIconComponent],
    }),
  ],
} as Meta;

const Template: Story<InputComponent> = (args: InputComponent) => ({
  component: InputComponent,
  props: args,
});

export const Basic = Template.bind({});
Basic.args = {
  label: '',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: '',
  disabled: true,
};

export const IconLeft = Template.bind({});
IconLeft.args = {
  label: '',
  icon: 'trash',
  iconLeft: true,
};

export const iconRight = Template.bind({});
iconRight.args = {
  label: '',
  icon: 'close',
  iconRight: true,
};

export const iconInvalid = Template.bind({});
iconInvalid.args = {
  label: '',
  invalid: true,
};

export const iconValid = Template.bind({});
iconValid.args = {
  label: '',
  valid: true,
};
