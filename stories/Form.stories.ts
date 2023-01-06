import { FormsModule } from '@angular/forms';
import { Meta, Story } from '@storybook/angular';
import { TextField } from '../projects/ion/src/lib/form/core/textField';
import { FormComponent } from '../projects/ion/src/lib/form/form.component';
import { InputComponent } from '../projects/ion/src/lib/input/input.component';
import { IonIconComponent } from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Data Entry/Forms',
  component: FormComponent,
} as Meta;

const Template: Story<FormComponent> = (args: FormComponent) => ({
  component: FormComponent,
  props: args,
  moduleMetadata: {
    declarations: [InputComponent, IonIconComponent],
    imports: [FormsModule],
    entryComponents: [InputComponent],
  },
});

export const Default = Template.bind({});
Default.args = {
  config: {
    fields: [
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
        disabled: true,
      }),
    ],
    model: {
      select: [1, 4, 1230],
    },
  },
};
