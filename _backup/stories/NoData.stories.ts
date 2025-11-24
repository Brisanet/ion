import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonNoDataComponent } from '../projects/ion/src/lib/no-data/no-data.component';
import { IonNoDataModule } from '../projects/ion/src/lib/no-data/no-data.module';

export default {
  title: 'Ion/Data Display/No data',
  component: IonNoDataComponent,
} as Meta;

const Template: Story<IonNoDataComponent> = (args: IonNoDataComponent) => ({
  component: IonNoDataComponent,
  props: { ...args },
  moduleMetadata: {
    imports: [CommonModule, IonNoDataModule],
    entryComponents: [IonNoDataComponent],
  },
});

export const Default = Template.bind({});
