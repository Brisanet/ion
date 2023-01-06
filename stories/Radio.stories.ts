import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { TextField } from '../projects/ion/src/lib/form/core/textField';
import { FormComponent } from '../projects/ion/src/lib/form/form.component';
import { InputComponent } from '../projects/ion/src/lib/input/input.component';
import { RadioComponent } from '../projects/ion/src/lib/radio/radio.component';
import { IonIconComponent } from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Data Entry/Radio',
  component: RadioComponent,
} as Meta;

const Template: Story<RadioComponent> = (args: RadioComponent) => ({
  component: RadioComponent,
  props: args,
  moduleMetadata: {
    declarations: [FormComponent, InputComponent, IonIconComponent],
    imports: [CommonModule, FormsModule],
    entryComponents: [InputComponent],
  },
});

export const Basic = Template.bind({});
Basic.args = {
  label: '',
  formConfig: [
    new TextField({
      key: 'nome',
      label: 'Nome',
      required: true,
      placeholder: 'Digite um nome',
    }),
    new TextField({
      key: 'password',
      label: 'Senha',
      required: true,
      placeholder: 'Digite uma senha',
      icon: 'filter',
    }),
  ],
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled',
  disabled: true,
};

export const checked = Template.bind({});
checked.args = {
  label: 'Checked',
  checked: true,
};
