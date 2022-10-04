import { CommonModule } from '@angular/common';
import { Component, ViewContainerRef } from '@angular/core';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { ButtonComponent } from '../projects/ion/src/lib/button/button.component';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { ModalComponent } from '../projects/ion/src/lib/modal/component/modal.component';
import { IonModalService } from '../projects/ion/src/lib/modal/ion-modal.service';
import { IonModalProps } from './../projects/ion/src/lib/modal/classes/modal.interface';

@Component({
  selector: 'test-component',
  template: `
    <ion-button [label]="'Open Modal'" (ionOnClick)="openModal()"></ion-button>
  `,
})
class TestComponent {
  constructor(
    private ionModalService: IonModalService,
    private containerRef: ViewContainerRef
  ) {}

  modalConfig: IonModalProps = {
    title: 'Ion Modal',
    canDismiss: false,
    cssClass: 'modal-container',
    footer: {
      primaryButton: {
        label: 'Save',
      },
      secondaryButton: {
        label: 'Cancel',
      },
    },
  };

  openModal() {
    const button = (ButtonComponent.prototype.label = 'Hello world');
    this.ionModalService
      .open(this.containerRef, ButtonComponent, this.modalConfig)
      .subscribe((value) => console.log('value from modal service', value));
  }
}

// TODO: check use of Story from Card Stories, to let show code appear.
export default {
  title: 'Ion/Data Display/Modal',
  component: TestComponent,
} as Meta<TestComponent>;

const Template: Story<TestComponent> = () => ({
  template: `
  <test-component> </test-component>
  `,

  moduleMetadata: {
    declarations: [
      ButtonComponent,
      IonIconComponent,
      TestComponent,
      ModalComponent,
    ],
    imports: [CommonModule],
    providers: [IonModalService],
    entryComponents: [ModalComponent, ButtonComponent],
  },
});

export const Base = Template.bind({});
