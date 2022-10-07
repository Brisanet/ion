import { CommonModule } from '@angular/common';
import { Component, Type, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { ButtonComponent } from '../projects/ion/src/lib/button/button.component';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { ModalComponent } from '../projects/ion/src/lib/modal/component/modal.component';
import { IonModalService } from '../projects/ion/src/lib/modal/ion-modal.service';
import {
  IonModalResponse,
  IonModalConfig,
} from './../projects/ion/src/lib/modal/classes/modal.interface';

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

  modalConfig: IonModalConfig;

  componentToBody: Type<unknown>;

  openModal() {
    this.ionModalService
      .open(this.containerRef, this.componentToBody, this.modalConfig)
      .subscribe((response: IonModalResponse) => {
        console.log('value from modal service', response);
      });
  }
}

@Component({
  template: `
    <label>Choose one</label>
    <select
      style="padding: 5px;
    border: none;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 15%), 0px 0px 2px rgb(0 0 0 / 15%);
    background: white;
    margin-left: 16px
    "
      [(ngModel)]="state"
    >
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
    <label for="name">Inform your name</label>
    <input
      style="margin: 8px 8px 16px"
      [(ngModel)]="name"
      type="text"
      name="name"
      id="name"
    />
    <ion-button
      [label]="'Save my name'"
      [disabled]="name?.length < 2"
      (ionOnClick)="this.closeModal()"
    ></ion-button>
  `,
})
class StepperTemplateComponent {
  constructor(private ionModalService: IonModalService) {}
  name: string;

  closeModal() {
    this.ionModalService.emitValueAndCloseModal({ name: this.name });
  }
}

const basicTemplate: Story<BaseComponent> = (args: BaseComponent) => ({
  component: BaseComponent,
  props: {
    ...args,
  },
  moduleMetadata: {
    declarations: [
      ButtonComponent,
      IonIconComponent,
      BaseComponent,
      ModalComponent,
      SelectTemplateComponent,
      StepperTemplateComponent,
    ],
    imports: [CommonModule, FormsModule],
    providers: [IonModalService],
    entryComponents: [
      ModalComponent,
      SelectTemplateComponent,
      StepperTemplateComponent,
    ],
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

export const closeByComponent = basicTemplate.bind({});
closeByComponent.args = {
  componentToBody: StepperTemplateComponent,
  modalConfig: {
    footer: {
      hide: true,
    },
  },
};
