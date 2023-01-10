import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Story } from '@storybook/angular/types-6-0';
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
    declarations: [InputComponent, IonIconComponent],
    imports: [CommonModule, FormsModule],
    entryComponents: [InputComponent],
  },
});

export const Basic = Template.bind({});
Basic.args = {
  label: '',
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
