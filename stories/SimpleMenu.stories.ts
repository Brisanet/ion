import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { SimpleMenuComponent } from '../projects/ion/src/lib/simple-menu/simple-menu.component';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import {
  TabComponent,
  TabGroupComponent,
} from '../projects/ion/src/public-api';

export default {
  title: 'Ion/Data Display/SimpleMenu',
  component: SimpleMenuComponent,
} as Meta;

const Template: Story<SimpleMenuComponent> = (args: SimpleMenuComponent) => ({
  component: SimpleMenuComponent,
  props: args,
  moduleMetadata: {
    declarations: [IonIconComponent, TabGroupComponent, TabComponent],
    imports: [CommonModule],
  },
});

export const WithValue = Template.bind({});
WithValue.args = {
  type: 'primary',
  value: 10,
};
