import { IonSelectComponent } from '../projects/ion/src/lib/select/select.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonSelectItemComponent } from '../projects/ion/src/lib/select/select-item/select-item.component';
import { moduleMetadata } from '@storybook/angular/dist/ts3.9/client';
import {
  IonDropdownModule,
  IonIconModule,
} from '../projects/ion/src/public-api';
import { FormsModule } from '@angular/forms';

export default {
  title: 'Ion/Data Entry/Select',
  Component: IonSelectComponent,
  decorators: [
    moduleMetadata({
      declarations: [IonSelectComponent, IonSelectItemComponent],
      imports: [IonIconModule, FormsModule, IonDropdownModule],
    }),
  ],
} as Meta;

const Template: Story<IonSelectComponent> = (args: IonSelectComponent) => ({
  component: IonSelectComponent,
  props: { ...args },
});

export const Default = Template.bind({});
