import { InputComponent } from '../projects/ion/src/lib/input/input.component';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { FormsModule } from '@angular/forms';

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
Input.args = {};

export const IconLeft = Template.bind({});
IconLeft.args = {
  iconInput: 'pencil',
  iconDirection: 'left',
};

export const iconRight = Template.bind({});
iconRight.args = {
  iconInput: 'pencil',
  iconDirection: 'right',
};

export const iconValid = Template.bind({});
iconValid.args = {
  valid: true,
};

export const iconInvalid = Template.bind({});
iconInvalid.args = {
  invalid: true,
};

export const rightWithIcon = Template.bind({});
rightWithIcon.args = {
  valid: true,
  iconDirection: 'right',
  iconInput: 'filter',
};

export const leftWithIcon = Template.bind({});
leftWithIcon.args = {
  valid: true,
  iconDirection: 'left',
  iconInput: 'filter',
};

export const inputButton = Template.bind({});
inputButton.args = {
  inputButton: true,
  iconDirection: 'left',
  iconInput: 'filter',
};

export const inputIconButton = Template.bind({});
inputIconButton.args = {
  inputIconButton: true,
  iconDirection: 'left',
  iconInput: 'filter',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
