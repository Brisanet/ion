import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { ButtonComponent } from '../projects/ion/src/lib/button/button.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { CommonModule } from '@angular/common';
import { Component, ViewContainerRef } from '@angular/core';
import { IonModalService } from '../projects/ion/src/lib/modal/ion-modal.service';
import { ModalComponent } from '../projects/ion/src/lib/modal/component/modal.component';

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

  openModal() {
    this.ionModalService
      .open(this.containerRef)
      .subscribe((value) => console.log('value from modal service', value));
  }
}

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
    entryComponents: [ModalComponent],
  },
});

export const Base = Template.bind({});
