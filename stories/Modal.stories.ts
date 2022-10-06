import { CommonModule } from '@angular/common';
import { Component, Type, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { ButtonComponent } from '../projects/ion/src/lib/button/button.component';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { ModalComponent } from '../projects/ion/src/lib/modal/component/modal.component';
import { IonModalService } from '../projects/ion/src/lib/modal/ion-modal.service';
import { IonModalResponse } from './../projects/ion/src/lib/modal/classes/modal.interface';

@Component({
  selector: 'base-component',
  template: `
    <ion-button [label]="'Open Modal'" (ionOnClick)="openModal()"></ion-button>
  `,
})
class BaseComponent {
  constructor(
    private ionModalService: IonModalService,
    private containerRef: ViewContainerRef
  ) {}

  componentToBody: Type<unknown>;

  openModal() {
    this.ionModalService
      .open(this.containerRef, this.componentToBody)
      .subscribe((response: IonModalResponse) => {
        console.log('value from modal service', response);
      });
  }
}

@Component({
  template: `
    <h3>Choose one</h3>
    <select [(ngModel)]="state">
      <option>Ceará</option>
      <option>Espirito Santo</option>
    </select>
  `,
})
class SelectTemplateComponent {
  state: string;
}

@Component({
  template: `
    <h4>Current Step: {{ step }}</h4>
    <ion-button [label]="" [disabled]="step === 3"></ion-button>
    <ion-button [label]="'next'" [disabled]="step === 3"></ion-button>
    (ionOnClick)="closeModal()"
  `,
})
class StepperTemplateComponent {
  constructor(private ionModalService: IonModalService) {}
  step;

  closeModal() {
    this.ionModalService.emitValueAndCloseModal({});
  }
}

const basicTemplate: Story<BaseComponent> = () => ({
  moduleMetadata: {
    declarations: [
      ButtonComponent,
      IonIconComponent,
      BaseComponent,
      ModalComponent,
      SelectTemplateComponent,
    ],
    imports: [CommonModule, FormsModule],
    providers: [IonModalService],
    entryComponents: [ModalComponent, SelectTemplateComponent],
  },
});

const closeByComponentTemplate: Story<BaseComponent> = () => ({
  template: `
  <base-component></base-component>
  `,
  moduleMetadata: {
    declarations: [
      ButtonComponent,
      IonIconComponent,
      BaseComponent,
      ModalComponent,
      SelectTemplateComponent,
    ],
    imports: [CommonModule, FormsModule],
    providers: [IonModalService],
    entryComponents: [ModalComponent, SelectTemplateComponent],
  },
});

export default {
  title: 'Ion/Data Display/Modal',
  component: BaseComponent,
} as Meta<BaseComponent>;

export const basic = basicTemplate.bind({});
basic.args = {
  componentToBody: SelectTemplateComponent,
};

export const closeByComponent = closeByComponentTemplate.bind({});
closeByComponent.args = {
  componentToBody: StepperTemplateComponent,
};
