import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular';
import { DefaultImageDirective } from '../projects/ion/src/lib/defaultImage.directive';
import {
  IonModalModule,
  IonSharedModule,
} from '../projects/ion/src/public-api';
import { IonWizardComponent } from '../projects/ion/src/lib/wizard/wizard.component';
import { WizardBodyComponent } from '../projects/ion/src/lib/wizard/body/wizard-body.component';

export default {
  title: 'Ion/Data Display/Wizard',
  component: IonWizardComponent,
} as Meta;

const Template: Story<IonWizardComponent> = (args: IonWizardComponent) => ({
  component: IonWizardComponent,
  props: args,
  moduleMetadata: {
    entryComponents: [WizardBodyComponent],
    declarations: [
      IonWizardComponent,
      DefaultImageDirective,
      WizardBodyComponent,
    ],
    imports: [CommonModule, IonSharedModule, IonModalModule],
  },
});

export const Closed = Template.bind({});
Closed.args = {
  config: {
    title: 'Novo Item',
  },
};

export const Opened = Template.bind({});
Opened.args = {
  config: {
    title: 'Novo Item',
    open: true,
  },
};
