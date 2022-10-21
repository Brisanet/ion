import { Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata, Story } from '@storybook/angular';
import { InputContadorComponent } from './../projects/ion/src/lib/input-contador/input-contador.component';
import { FormsModule } from '@angular/forms';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
export default {
  title: 'Ion/Data Entry/Input-Cont',
  component: InputContadorComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
      declarations: [IonIconComponent],
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
  size: 'sm',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'md',
};
