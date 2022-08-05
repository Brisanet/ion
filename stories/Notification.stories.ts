import { Story, Meta } from '@storybook/angular/types-6-0';
import { NotificationComponent } from '../projects/ion/src/lib/notification/notification.component';
import { moduleMetadata } from '@storybook/angular';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';

export default {
  title: 'Ion/Feedback/Notification',
  component: NotificationComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      declarations: [IonIconComponent],
    }),
  ],
} as Meta;

const Template: Story<NotificationComponent> = (
  args: NotificationComponent
) => ({
  component: NotificationComponent,
  props: args,
});

export const Basic = Template.bind({});
Basic.args = {
  title: 'Parabéns!',
  message: 'Seu cadastro foi realizado com sucesso!',
};

export const CustomIcon = Template.bind({});
CustomIcon.args = {
  title: 'Editado',
  message: 'Um item foi editado no seu inventário',
  icon: 'pencil',
};
