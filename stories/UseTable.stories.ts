import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular';
import { DefaultImageDirective } from '../projects/ion/src/lib/defaultImage.directive';
import {
  IonSharedModule,
  IonSmartTableModule,
} from '../projects/ion/src/public-api';
import { IonUseTableComponent } from '../projects/ion/src/lib/use-table/use-table.component';

export default {
  title: 'Ion/Core/UseBnTable',
  component: IonUseTableComponent,
  parameters: {
    docs: false,
  },
} as Meta;

const Template: Story<IonUseTableComponent> = (args: IonUseTableComponent) => ({
  component: IonUseTableComponent,
  props: args,
  moduleMetadata: {
    declarations: [IonUseTableComponent, DefaultImageDirective],
    imports: [CommonModule, IonSharedModule, IonSmartTableModule],
  },
});

export const Default = Template.bind({});
Default.args = {
  message: 'initials',
};
