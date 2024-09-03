import { Meta, Story } from '@storybook/angular';
import { TesteThemeComponent } from '../projects/ion/src/lib/theme/mocks/teste-theme.component';
import {
  IonAlertModule,
  IonSharedModule,
} from '../projects/ion/src/public-api';

const Template: Story<TesteThemeComponent> = () => ({
  component: TesteThemeComponent,
  moduleMetadata: {
    imports: [IonAlertModule, IonSharedModule],
    declarations: [TesteThemeComponent],
  },
});

export const Teste = Template.bind({});

export default {
  title: 'Ion/Design Tokens/Theme',
  component: TesteThemeComponent,
} as Meta;
