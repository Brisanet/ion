import { FormsModule } from '@angular/forms';
import { Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata, Story } from '@storybook/angular';
import { IonInputAreaComponent } from '../projects/ion/src/lib/input-area/input-area.component';

export default {
  title: 'Ion/Data Entry/Input-Area',
  component: IonInputAreaComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
      declarations: [],
    }),
  ],
} as Meta;

const Template: Story<IonInputAreaComponent> = (
  args: IonInputAreaComponent
) => ({
  component: IonInputAreaComponent,
  props: args,
});

export const InputArea = Template.bind({});
InputArea.args = {};

export const InputCustomPlaceholder = Template.bind({});
InputCustomPlaceholder.args = {
  placeholder: 'Digite algo aqui...',
};

export const InputDisabled = Template.bind({});
InputDisabled.args = {
  disabled: true,
};
