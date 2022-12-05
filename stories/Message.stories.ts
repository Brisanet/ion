import { IonIconComponent } from './../projects/ion/src/lib/icon/icon.component';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MessageComponent } from '../projects/ion/src/lib/message/message.component';
import {
  AlertComponent,
  ButtonComponent,
  CheckboxComponent,
  IonDividerComponent,
  PaginationComponent,
  PopConfirmDirective,
  SmartTableComponent,
  TagComponent,
} from '../projects/ion/src/public-api';
import { ButtonModule } from '../projects/ion/src/lib/button/button.module';
import { PopConfirmComponent } from '../projects/ion/src/lib/popconfirm/popconfirm.component';

export default {
  title: 'Ion/Feedback/Message',
  component: MessageComponent,
  decorators: [
    moduleMetadata({
      entryComponents: [PopConfirmComponent],
      imports: [ButtonModule],
      declarations: [
        SmartTableComponent,
        CheckboxComponent,
        TagComponent,
        PopConfirmComponent,
        PopConfirmDirective,
        PaginationComponent,
        AlertComponent,
        IonDividerComponent,
      ],
    }),
  ],
} as Meta;

const Template: Story<MessageComponent> = (args: MessageComponent) => ({
  component: MessageComponent,
  props: args,
});

export const Positive = Template.bind({});
Positive.args = {
  label: 'Custom label',
  type: 'positive',
};

export const Negative_alert = Template.bind({});
Negative_alert.args = {
  label: 'Custom label',
  type: 'negative_alert',
};

export const Negative_erro = Template.bind({});
Negative_erro.args = {
  label: 'Custom label',
  type: 'negative_erro',
};

export const Warning = Template.bind({});
Warning.args = {
  label: 'Custom label',
  type: 'warning',
};

export const Info = Template.bind({});
Info.args = {
  label: 'Custom label',
  type: 'info',
};

export const Custom = Template.bind({});
Custom.args = {
  label: 'Custom label',
  type: 'custom',
};
