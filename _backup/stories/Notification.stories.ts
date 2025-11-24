import { Story, Meta } from '@storybook/angular/types-6-0';
import { IonNotificationComponent } from '../projects/ion/src/lib/notification/component/notification.component';
import {
  IonIconModule,
  IonNotificationModule,
  IonSharedModule,
} from '../projects/ion/src/public-api';
import { OpenNotificationButtonComponent } from '../projects/ion/src/lib/notification/mock/open-notification-mock.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { moduleMetadata } from '@storybook/angular';

const Template: Story<IonNotificationComponent> = (
  args: IonNotificationComponent
) => ({
  component: IonNotificationComponent,
  props: args,
});

const basicTemplate: Story<IonNotificationComponent> = (
  args: IonNotificationComponent
) => ({
  component: OpenNotificationButtonComponent,
  props: {
    ...args,
  },
  moduleMetadata: {
    declarations: [OpenNotificationButtonComponent],
    imports: [
      CommonModule,
      FormsModule,
      IonSharedModule,
      IonNotificationModule,
    ],
    entryComponents: [OpenNotificationButtonComponent],
  },
});

export default {
  title: 'Ion/Feedback/Notification',
  component: IonNotificationComponent,
  decorators: [
    moduleMetadata({
      imports: [IonIconModule],
    }),
  ],
} as Meta<IonNotificationComponent>;

export const Service = basicTemplate.bind({});
Service.args = {
  componentToBody: OpenNotificationButtonComponent,
};

export const Basic = Template.bind({});
Basic.args = {
  title: 'Parabéns',
  message: 'Seu cadastro foi realizado com sucesso!',
};

export const Fixed = Template.bind({});
Fixed.args = {
  title: 'Notificação Fixa',
  message:
    'Você precisa fechar essa notificação, ela não desaparece automaticamente.',
  type: 'negative',
  fixed: true,
};

export const Info = Template.bind({});
Info.args = {
  title: 'Informação',
  message: 'Seu cadastro está regular!',
  type: 'info',
};

export const Warning = Template.bind({});
Warning.args = {
  title: 'Cuidado',
  message: 'Seu cadastro será excluído em 5 dias!',
  type: 'warning',
};

export const Negative = Template.bind({});
Negative.args = {
  title: 'Falha',
  message: 'Houve um erro com seu login!',
  type: 'negative',
};

export const CustomIcon = Template.bind({});
CustomIcon.args = {
  title: 'Editado',
  message: 'Um item foi editado no seu inventário',
  icon: 'pencil',
};

export const CustomAnimation = Template.bind({});
CustomAnimation.args = {
  title: 'Editado',
  message: 'Um item foi editado no seu inventário',
  fadeIn: 'fadeInUp',
  fadeOut: 'fadeOutDown',
};
