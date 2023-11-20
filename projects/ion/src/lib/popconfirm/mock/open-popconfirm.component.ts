import { Component } from '@angular/core';

@Component({
  template: `
    <style>
      div {
        height: 400px;
        display: flex;
        align-items: center;
      }
    </style>
    <div>
      <ion-button
        label="Open Popconfirm"
        ionPopConfirm
        ionConfirmText="Sim"
        ionCancelText="Não"
      >
      </ion-button>
    </div>
  `,
})
export class OpenPopconfirmComponent {}
