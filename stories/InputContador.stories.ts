import { Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata, Story } from '@storybook/angular';
import { InputContadorComponent } from './../projects/ion/src/lib/input-contador/input-contador.component';
import { FormsModule } from '@angular/forms';
import {
  BadgeComponent,
  ButtonComponent,
  DropdownComponent,
  IonIconComponent,
} from '../projects/ion/src/public-api';
export default {
  title: 'Ion/Data Entry/Input-Counter',
  component: InputContadorComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
      declarations: [
        IonIconComponent,
        ButtonComponent,
        BadgeComponent,
        DropdownComponent,
      ],
    }),
  ],
} as Meta;

const Template: Story<InputContadorComponent> = (
  args: InputContadorComponent
) => ({
  component: InputContadorComponent,
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
