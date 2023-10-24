import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonModalComponent } from '../projects/ion/src/lib/modal/component/modal.component';
import { SelectMockComponent } from '../projects/ion/src/lib/modal/mock/select-mock.component';
import {
  IonSharedModule,
  IonModalModule,
  IonPopConfirmModule,
} from '../projects/ion/src/public-api';

const basicTemplate: Story<IonModalComponent> = (args: IonModalComponent) => ({
  component: IonModalComponent,
  props: {
    ...args,
  },
  moduleMetadata: {
    declarations: [SelectMockComponent],
    imports: [
      CommonModule,
      FormsModule,
      IonSharedModule,
      IonModalModule,
      IonPopConfirmModule,
    ],
    entryComponents: [SelectMockComponent],
  },
});

export default {
  title: 'Ion/Data Display/Modal',
  component: IonModalComponent,
} as Meta<IonModalComponent>;

export const Component = basicTemplate.bind({});
Component.args = {
  componentToBody: SelectMockComponent,
};
