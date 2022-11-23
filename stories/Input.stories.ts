import { InputComponent } from '../projects/ion/src/lib/input/input.component';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { FormsModule } from '@angular/forms';
import { action } from '@storybook/addon-actions';

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

export const Input = Template.bind({});
Input.args = {
  valueChange: action('valueChange'),
};

export const IconLeft = Template.bind({});
IconLeft.args = {
  iconInput: 'pencil',
  iconDirection: 'left',
  valueChange: action('valueChange'),
};

export const iconRight = Template.bind({});
iconRight.args = {
  iconInput: 'pencil',
  iconDirection: 'right',
  valueChange: action('valueChange'),
};

export const iconValid = Template.bind({});
iconValid.args = {
  valid: true,
  valueChange: action('valueChange'),
};

export const iconInvalid = Template.bind({});
iconInvalid.args = {
  invalid: true,
  valueChange: action('valueChange'),
};

export const rightWithIcon = Template.bind({});
rightWithIcon.args = {
  valid: true,
  iconDirection: 'right',
  iconInput: 'filter',
  valueChange: action('valueChange'),
};

export const leftWithIcon = Template.bind({});
leftWithIcon.args = {
  valid: true,
  iconDirection: 'left',
  iconInput: 'filter',
  valueChange: action('valueChange'),
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  valueChange: action('valueChange'),
};
