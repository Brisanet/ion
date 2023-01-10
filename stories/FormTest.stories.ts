import { FormsModule } from '@angular/forms';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { FormComponent } from '../projects/ion/src/lib/form/form.component';
import { FormStoryComponent } from '../projects/ion/src/lib/form/mock/formStory.component';
import { InputComponent } from '../projects/ion/src/lib/input/input.component';
import { IonIconComponent } from '../projects/ion/src/public-api';

export default {
  title: 'FormStoryTest',
  decorators: [
    moduleMetadata({
      declarations: [
        InputComponent,
        IonIconComponent,
        FormComponent,
        FormStoryComponent,
      ],
      imports: [FormsModule],
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
