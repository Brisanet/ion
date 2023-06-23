import { IonInputComponent } from '../projects/ion/src/lib/input/input.component';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { IonSharedModule } from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Data Entry/Input',
  component: IonInputComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, IonSharedModule],
    }),
  ],
} as Meta;

const Template: Story<IonInputComponent> = (args: IonInputComponent) => ({
  component: IonInputComponent,
  props: { ...args, valueChange: action('valueChange') },
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

export const iconValidation = Template.bind({});
iconValidation.args = {
  valid: true,
  showIconValidation: true,
};

export const errorMsg = Template.bind({});
errorMsg.args = {
  valid: false,
  errorMsg: 'Invalid input',
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

export const InputText = Template.bind({});
InputText.args = {
  inputType: 'text',
};

export const InputPassword = Template.bind({});
InputPassword.args = {
  inputType: 'password',
  clearButton: true,
};

export const InputWithSearch = Template.bind({});
InputWithSearch.args = {
  inputType: 'text',
  iconInput: 'search',
  iconDirection: 'right',
};

export const InputSearchWithClearButton = Template.bind({});
InputSearchWithClearButton.args = {
  inputType: 'text',
  iconInput: 'search',
  iconDirection: 'left',
  clearButton: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const MaxLength = Template.bind({});
MaxLength.args = {
  maxLength: 3,
};
