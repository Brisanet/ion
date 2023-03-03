import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { FormComponent } from '../projects/ion/src/lib/form/form.component';
import { FormStoryComponent } from '../projects/ion/src/lib/form/mock/formStory.component';
import { InputAreaComponent } from '../projects/ion/src/lib/input-area/input-area.component';
import { InputComponent } from '../projects/ion/src/lib/input/input.component';
import { SwitchComponent } from '../projects/ion/src/lib/switch/switch.component';
import { IonIconComponent } from '../projects/ion/src/public-api';

export default {
  title: 'FormStoryTest',
  decorators: [
    moduleMetadata({
      declarations: [
        InputComponent,
        InputAreaComponent,
        SwitchComponent,
        IonIconComponent,
        FormComponent,
        FormStoryComponent,
      ],
      imports: [FormsModule, ReactiveFormsModule],
      entryComponents: [InputComponent],
    }),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: args,
  template: `
    <div>
      <form-story></form-story>
    </div>
  `,
});

export const Simple = Template.bind({});
Simple.args = {};
