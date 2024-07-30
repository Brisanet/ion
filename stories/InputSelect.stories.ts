import { FormsModule } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import {
  defaultSelectOptions,
  IonInputSelectComponent,
} from '../projects/ion/src/lib/input-select/input-select.component';
import { IonSharedModule } from './../projects/ion/src/lib/shared.module';

const customSelectOptions = [
  {
    label: 'Acima de',
    multiple: true,
  },
  {
    label: 'Abaixo de',
  },
];

export default {
  title: 'Ion/Data Entry/Input Select',
  component: IonInputSelectComponent,
  args: {
    selectOptions: defaultSelectOptions,
  },
  decorators: [
    moduleMetadata({
      imports: [FormsModule, IonSharedModule],
    }),
  ],
} as Meta;

const Template: Story<IonInputSelectComponent> = (
  args: IonInputSelectComponent
) => ({
  component: IonInputSelectComponent,
  props: { ...args, valueChange: action('valueChanges') },
});

export const InputSelect = Template.bind({});
InputSelect.args = {};

export const InputSelectDisabled = Template.bind({});
InputSelectDisabled.args = {
  disabled: true,
};

export const InputSelectWithCustomOptions = Template.bind({});
InputSelectWithCustomOptions.args = {
  selectOptions: customSelectOptions,
};
