import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { ButtonComponent } from '../projects/ion/src/lib/button/button.component';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { ModalComponent } from '../projects/ion/src/lib/modal/component/modal.component';
import { IonModalService } from '../projects/ion/src/lib/modal/ion-modal.service';
import { InputMockComponent } from './../projects/ion/src/lib/modal/mock/input-mock.component';
import { SelectMockComponent } from './../projects/ion/src/lib/modal/mock/select-mock.component';
import { OpenModalButtonComponent } from '../projects/ion/src/lib/modal/mock/open-modal.mock.component';

const basicTemplate: Story<OpenModalButtonComponent> = (
  args: OpenModalButtonComponent
) => ({
  component: OpenModalButtonComponent,
  props: {
    ...args,
  },
  moduleMetadata: {
    declarations: [
      ButtonComponent,
      IonIconComponent,
      OpenModalButtonComponent,
      ModalComponent,
      SelectMockComponent,
      InputMockComponent,
    ],
    imports: [CommonModule, FormsModule],
    providers: [IonModalService],
    entryComponents: [ModalComponent, SelectMockComponent, InputMockComponent],
  },
});

export default {
  title: 'Ion/Data Display/Modal',
  component: OpenModalButtonComponent,
} as Meta<OpenModalButtonComponent>;

export const basic = basicTemplate.bind({});
basic.args = {
  componentToBody: SelectMockComponent,
};

export const closeByComponent = basicTemplate.bind({});
closeByComponent.args = {
  componentToBody: InputMockComponent,
  modalConfig: {
    footer: {
      hide: true,
    },
  },
};
