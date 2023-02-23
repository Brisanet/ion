import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonPopoverComponent } from '../projects/ion/src/lib/popover/component/popover.component';
import { PopoverPosition } from '../projects/ion/src/lib/core/types/popover';
import { IonSharedModule } from '../projects/ion/src/public-api';
import { IonDividerComponent } from '../projects/ion/src/lib/divider/divider.component';

const TemplateComponente: Story<IonPopoverComponent> = (
  args: IonPopoverComponent
) => ({
  component: IonPopoverComponent,
  props: {
    ...args,
  },
  moduleMetadata: {
    declarations: [IonDividerComponent],
    imports: [CommonModule, IonSharedModule],
  },
});

export const DefaultComponent = TemplateComponente.bind({});
DefaultComponent.args = {
  ionPopoverTitle: 'Você tem certeza?',
  ionPopoverBody:
    'Ao concluir essa ação as ordens de serviço alocadas para o recurso ficarão órfãs.',
  ionPopoverIconClose: true,
  ionPopoverPosition: PopoverPosition.DEFAULT,
  ionPopoverActions: null,
};

export const withActions = TemplateComponente.bind({});
withActions.args = {
  ionPopoverTitle: 'Você tem certeza?',
  ionPopoverBody:
    'Ao concluir essa ação as ordens de serviço alocadas para o recurso ficarão órfãs.',
  ionPopoverIcon: 'condominium',
  ionPopoverIconClose: true,
  ionPopoverPosition: PopoverPosition.DEFAULT,
  ionPopoverActions: [{ label: 'action 1' }, { label: 'action 2' }],
};

export default {
  title: 'Ion/Data Display/Popover',
  component: IonPopoverComponent,
} as Meta<IonPopoverComponent>;
