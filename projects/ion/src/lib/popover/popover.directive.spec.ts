import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { fireEvent, render, screen } from '@testing-library/angular';
import { PopoverPosition } from '../core/types/popover';
import { IonSharedModule } from '../shared.module';
import { IonPopoverModule } from './popover.module';

const textButton = 'Teste';

@Component({
  template: `
    <ion-button
      data-testid="hostPopover"
      ionPopover
      [ionPopoverTitle]="ionPopoverTitle"
      [ionPopoverBody]="ionPopoverBody"
      [ionPopoverIcon]="ionPopoverIcon"
      [ionPopoverIconClose]="ionPopoverIconClose"
      [ionPopoverPosition]="ionPopoverPosition"
      [ionPopoverActions]="ionPopoverActions"
      (ionOnFirstAction)="confirm()"
      class="get-test"
      style="margin-top: 50px;"
      [label]="${textButton}"
    >
    </ion-button>
  `,
})
class HostTestComponent {
  ionPopoverTitle = 'Eu sou um popover';
  ionPopoverBody = 'e eu sou o body do popover';
  ionPopoverPosition = PopoverPosition.DEFAULT;
  ionPopoverIconClose = true;
  ionPopoverIcon = 'condominium';
  ionPopoverActions = [{ label: 'actions 1' }, { label: 'action 2' }];
}

const sut = async (props: Partial<HostTestComponent> = {}): Promise<void> => {
  await render(HostTestComponent, {
    componentProperties: props,
    imports: [CommonModule, IonPopoverModule, IonSharedModule],
  });
};

describe('Directive: popover', () => {
  afterEach(async () => {
    fireEvent.mouseLeave(screen.getByTestId('hostPopover'));
  });

  it('should render without popover', async () => {
    await sut();
    expect(screen.queryByTestId('ion-popover')).not.toBeInTheDocument();
  });

  it('should create popover', async () => {
    await sut();
    fireEvent.click(screen.getByTestId('hostPopover'));
    expect(screen.getByTestId('ion-popover')).toBeInTheDocument();
  });
});
