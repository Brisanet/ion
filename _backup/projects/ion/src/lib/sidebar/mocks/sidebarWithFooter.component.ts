import { Component, OnInit } from '@angular/core';
import { IonSidebarProps } from '../../core/types';
import { IonThemeScheme, IonThemeService } from '../../theme';

export const SIDEBAR_WITH_FOOTER_PROPS: IonSidebarProps = {
  logo: '',
  items: [
    {
      title: 'Gerenciamento',
      icon: 'working',
      options: [
        { title: 'Gerência', icon: 'user' },
        { title: 'Grupos', icon: 'union' },
        { title: 'Pausas', icon: 'wait' },
        { title: 'Comissões', icon: 'calendar-money' },
      ],
    },
    { title: 'Fila de atendimento', icon: 'headset' },
    { title: 'Cadastros', icon: 'plus-solid' },
    { title: 'Comissões', icon: 'calendar-money', disabled: true },
    {
      title: 'Gerenciamento',
      icon: 'working',
      options: [
        { title: 'Gerência', icon: 'user' },
        { title: 'Grupos', icon: 'union' },
        { title: 'Pausas', icon: 'wait' },
        { title: 'Comissões', icon: 'calendar-money' },
      ],
    },
    {
      title: 'Permissões',
      icon: 'config',
      options: [
        { title: 'Gerência', icon: 'user' },
        { title: 'Grupos', icon: 'union' },
        { title: 'Pausas', icon: 'wait' },
        { title: 'Comissões', icon: 'calendar-money', disabled: true },
      ],
    },
  ],
};

@Component({
  template: `
    <style>
      .footer-content {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 8px;
        color: var(--ion-neutral-7);
      }
      .avatar-circle {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--ion-primary-5);
      }
    </style>
    <div>
      <div>
        <ion-sidebar
          [logo]="props.logo"
          [items]="props.items"
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
export class SidebarWithFooterComponent implements OnInit {
  public sidebarClosed = true;
  public props = SIDEBAR_WITH_FOOTER_PROPS;

  constructor(private themeService: IonThemeService) {}

  public updateSidebarState(isClosed: boolean): void {
    this.sidebarClosed = isClosed;
  }

  public ngOnInit(): void {
    this.themeService.theme$.subscribe((theme) => {
      SIDEBAR_WITH_FOOTER_PROPS.logo =
        theme.scheme === IonThemeScheme.DARK
          ? require('../../../../../../stories/assets/sidebar-logo-dark.svg')
          : require('../../../../../../stories/assets/sidebar-logo.svg');
    });
  }
}
