import { CommonModule } from '@angular/common';
import { Component, Input, ViewContainerRef } from '@angular/core';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { ButtonComponent } from '../projects/ion/src/lib/button/button.component';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { ModalComponent } from '../projects/ion/src/lib/modal/component/modal.component';
import { IonModalService } from '../projects/ion/src/lib/modal/ion-modal.service';
import { IonModalProps } from './../projects/ion/src/lib/modal/classes/modal.interface';

// TODO: check use of Story from Card Stories, to let show code appear.
@Component({
  selector: 'test-component',
  template: `
    <ion-button [label]="'Open Modal'" (ionOnClick)="openModal()"></ion-button>
  `,
})
class BasicExampleComponent {
  constructor(
    private ionModalService: IonModalService,
    private containerRef: ViewContainerRef
  ) {}

  modalConfig: IonModalProps = {
    title: 'Ion Modal',
    overlayCanDismiss: true,
  };

  openModal() {
    ButtonComponent.prototype.label = 'Hello world';
    this.ionModalService
      .open(this.containerRef, ButtonComponent, this.modalConfig)
      .subscribe((value) => console.log('value from modal service', value));
  }
}

export default {
  title: 'Ion/Data Display/Modal',
  component: BasicExampleComponent,
} as Meta<BasicExampleComponent>;

const basicTemplate: Story<BasicExampleComponent> = () => ({
  template: `
  <test-component> </test-component>
  `,

  moduleMetadata: {
    declarations: [
      ButtonComponent,
      IonIconComponent,
      BasicExampleComponent,
      ModalComponent,
    ],
    imports: [CommonModule],
    providers: [IonModalService],
    entryComponents: [ModalComponent, ButtonComponent],
  },
});

export const Basic = basicTemplate.bind({});

@Component({
  selector: 'close-modal-example',
  template: `
    <ion-button [label]="'next'" (ionOnClick)="closeModal()"></ion-button>
  `,
})
class CloseModalExampleComponent {
  constructor(private ionModalService: IonModalService) {}
  @Input() testValue = 'Works!';
  text: 'Yay!';

  closeModal() {
    this.ionModalService.emitValueAndCloseModal({
      valueTest: this.testValue,
      text: this.text,
    });
  }
}

// const withoutFooterTemplate: Story<TestComponent> = (args: TestComponent) => ({
//   component: TestComponent,
//   args: args,
//   moduleMetadata: {
//     declarations: [
//       ButtonComponent,
//       IonIconComponent,
//       TestComponent,
//       ModalComponent,
//       CloseModalExampleComponent,
//     ],
//     imports: [CommonModule],
//     providers: [IonModalService],
//     entryComponents: [
//       ModalComponent,
//       ButtonComponent,
//       CloseModalExampleComponent,
//     ],
//   },
// });

// export const WithoutFooter = withoutFooterTemplate.bind({}) as Meta;
