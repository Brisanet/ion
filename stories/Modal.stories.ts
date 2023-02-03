import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonModalComponent } from '../projects/ion/src/lib/modal/component/modal.component';
import { IonModalService } from '../projects/ion/src/lib/modal/modal.service';
import { SelectMockComponent } from '../projects/ion/src/lib/modal/mock/select-mock.component';
import { IonSharedModule } from '../projects/ion/src/public-api';

const basicTemplate: Story<IonModalComponent> = (args: IonModalComponent) => ({
  component: IonModalComponent,
  props: {
    ...args,
  },
  moduleMetadata: {
    declarations: [IonModalComponent, SelectMockComponent],
    imports: [CommonModule, FormsModule, IonSharedModule],
    providers: [IonModalService],
    entryComponents: [IonModalComponent, SelectMockComponent],
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
