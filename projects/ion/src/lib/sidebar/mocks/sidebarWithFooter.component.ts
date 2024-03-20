import { Component } from '@angular/core';
import { action } from '@storybook/addon-actions';

@Component({
  template: `
    <style>
      .footer-content {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 8px;
      }
      .avatar-circle {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #008000;
      }
    </style>
    <div>
      <div>
        <ion-sidebar
          [logo]="logo"
          [items]="items"
          [shrinkMode]="true"
          [sidebarFooter]="footerTemplate"
          (ionOnSidebarToggle)="updateSidebarState($event)"
        ></ion-sidebar>
        <ng-template #footerTemplate>
          <div class="footer-content" data-testid="footer-content">
            <div class="avatar-circle"></div>
            <h3 *ngIf="!sidebarClosed">Footer Title</h3>
          </div>
        </ng-template>
      </div>
    </div>
  `,
})
export class SidebarWithFooterComponent {
  logo = require('../../../../../../stories/assets/sidebar-logo.svg');
  sidebarClosed = true;
  items = [
    {
      title: 'Gerenciamento',
      icon: 'working',
      options: [
        {
          title: 'Gerência',
          icon: 'user',
          action: action('Gerência'),
        },
        {
          title: 'Grupos',
          icon: 'union',
          action: action('Grupos'),
        },
        {
          title: 'Pausas',
          icon: 'wait',
          action: action('Pausas'),
        },
        {
          title: 'Comissões',
          icon: 'calendar-money',
          action: action('Comissões'),
        },
      ],
    },
    {
      title: 'Fila de atendimento',
      icon: 'headset',
      action: action('Fila de atendimento'),
    },
    {
      title: 'Fila de atendimento',
      icon: 'headset',
      action: action('Fila de atendimento'),
    },
    {
      title: 'Fila de atendimento',
      icon: 'headset',
      action: action('Fila de atendimento'),
    },
    {
      title: 'Fila de atendimento',
      icon: 'headset',
      action: action('Fila de atendimento'),
    },
    {
      title: 'Fila de atendimento',
      icon: 'headset',
      action: action('Fila de atendimento'),
    },
    {
      title: 'Fila de atendimento',
      icon: 'headset',
      action: action('Fila de atendimento'),
    },
    {
      title: 'Fila de atendimento',
      icon: 'headset',
      action: action('Fila de atendimento'),
    },
    { title: 'Cadastros', icon: 'plus-solid', action: action('Cadastros') },
    {
      title: 'Comissões',
      icon: 'calendar-money',
      action: action('Comissões'),
      disabled: true,
    },
    {
      title: 'Gerenciamento',
      icon: 'working',
      options: [
        {
          title: 'Gerência',
          icon: 'user',
          action: action('Gerência'),
        },
        {
          title: 'Grupos',
          icon: 'union',
          action: action('Grupos'),
        },
        {
          title: 'Pausas',
          icon: 'wait',
          action: action('Pausas'),
        },
        {
          title: 'Comissões',
          icon: 'calendar-money',
          action: action('Comissões'),
        },
      ],
    },
    {
      title: 'Permissões',
      icon: 'config',
      action: action('Permissões'),
      options: [
        {
          title: 'Gerência',
          icon: 'user',
          action: action('Gerência'),
        },
        {
          title: 'Grupos',
          icon: 'union',
          action: action('Grupos'),
        },
        {
          title: 'Pausas',
          icon: 'wait',
          action: action('Pausas'),
        },
        {
          title: 'Comissões',
          icon: 'calendar-money',
          action: action('Comissões'),
          disabled: true,
        },
      ],
    },
  ];

  updateSidebarState(isClosed: boolean): void {
    this.sidebarClosed = isClosed;
  }
}
