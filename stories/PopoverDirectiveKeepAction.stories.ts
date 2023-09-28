import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { PopoverPosition } from '../projects/ion/src/lib/core/types/popover';
import { KeepOpenPopoverActionComponent } from '../projects/ion/src/lib/popover/mock/keep-open-popover-action.component';
import {
  IonPopoverModule,
  IonSharedModule,
} from '../projects/ion/src/public-api';

const Template: Story<KeepOpenPopoverActionComponent> = (
  args: KeepOpenPopoverActionComponent
) => ({
  component: KeepOpenPopoverActionComponent,
  props: {
    ...args,
  },
  moduleMetadata: {
    declarations: [KeepOpenPopoverActionComponent],
    imports: [CommonModule, IonSharedModule, IonPopoverModule],
    entryComponents: [KeepOpenPopoverActionComponent],
  },
});

export const DirectiveWithActionsKeepAction = Template.bind({});
DirectiveWithActionsKeepAction.args = {
  ionPopoverTitle: 'Desafio na Jornada',
  ionPopoverBody:
    'Você pode escolher avançar corajosamente para a próxima etapa da jornada ou optar por explorar o caminho anterior.',
  ionPopoverPosition: PopoverPosition.DEFAULT,
  ionPopoverIconClose: true,
  ionPopoverActions: [
    { label: 'voltar', keepOpenAfterAction: true },
    { label: 'continuar', keepOpenAfterAction: true },
  ],
};

export default {
  title: 'Ion/Data Display/Popover',
  component: KeepOpenPopoverActionComponent,
} as Meta<KeepOpenPopoverActionComponent>;
