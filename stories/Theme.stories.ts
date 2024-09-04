import { Meta, Story } from '@storybook/angular';
import { ThemeDemoComponent } from '../projects/ion/src/lib/theme/mocks/theme-demo.component';
import { ThemeDemoModule } from '../projects/ion/src/lib/theme/mocks/theme-demo.module';

const Template: Story<ThemeDemoComponent> = () => ({
  component: ThemeDemoComponent,
  moduleMetadata: { imports: [ThemeDemoModule] },
});

export const Teste = Template.bind({});

export default {
  title: 'Ion/Design Tokens/Theme',
  component: ThemeDemoComponent,
} as Meta;
