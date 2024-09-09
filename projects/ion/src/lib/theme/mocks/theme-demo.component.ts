import { Component } from '@angular/core';

import { BodyMockComponent } from '../../card/mock/body-mock.component';
import { IonCard, TooltipPosition } from '../../core/types';
import { IonThemes, IonThemeService } from '../theme.service';

@Component({
  selector: 'ion-teste-theme',
  template: `
    <main>
      <div class="flex">
        <ion-button
          *ngFor="let theme of object.values(ionThemes)"
          [label]="theme"
          type="secondary"
          (ionOnClick)="setTheme(theme)"
        ></ion-button>
      </div>

      <ion-divider type="text" label="alerts"></ion-divider>

      <div class="flex-column">
        <ion-alert
          *ngFor="let variant of alertVariantOptions"
          [message]="variant"
          [type]="variant"
        ></ion-alert>

        <ion-alert
          *ngFor="let variant of alertVariantOptions"
          [type]="variant"
          message="alert with description"
          description="This is a description"
        ></ion-alert>
      </div>

      <ion-divider type="text" label="avatars"></ion-divider>

      <div class="flex" *ngFor="let size of avatarSizeOption">
        <ion-avatar
          type="initials"
          [size]="size"
          value="Vinicius Guedes"
        ></ion-avatar>

        <ion-avatar type="icon" [size]="size"></ion-avatar>

        <ion-avatar
          type="photo"
          [size]="size"
          image="https://64.media.tumblr.com/40e2174ab5e68b1eabbc3dfc78607cef/c1effc67d5c3a1fd-20/s540x810/9d6ce72fcddf97841e7410a0652dd9d5f018b35d.pnj"
        ></ion-avatar>
      </div>

      <ion-divider type="text" label="badges"></ion-divider>

      <div>
        <div class="flex" *ngFor="let type of badgeTypes">
          <ion-badge [type]="type" [value]="10"></ion-badge>
          <ion-badge [type]="type" label="teste"></ion-badge>
        </div>
      </div>

      <ion-divider type="text" label="breadcrumbs"></ion-divider>

      <ion-breadcrumb [breadcrumbs]="breadcrumbs"></ion-breadcrumb>
      <ion-breadcrumb [breadcrumbs]="bigBreadcrumbs"></ion-breadcrumb>

      <ion-divider type="text" label="buttons and switchs"></ion-divider>

      <div *ngFor="let size of switchSizeOptions">
        <div class="flex">
          <div
            class="flex"
            *ngFor="let attribute of object.keys(buttonAtributes)"
          >
            <span class="switch-label">{{ attribute }}</span>
            <ion-switch
              [size]="size"
              [value]="buttonAtributes[attribute]"
              (atValueChange)="handleSwitch(attribute, $event)"
            ></ion-switch>
          </div>
        </div>
      </div>

      <table>
        <tr *ngFor="let size of buttonSizeOptions">
          <td *ngFor="let variant of buttonVariantOptions">
            <ion-button
              [label]="variant + ' ' + size"
              [type]="variant"
              [size]="size"
              iconType="send"
              [rightSideIcon]="buttonAtributes.rightSideIcon"
              [danger]="buttonAtributes.danger"
              [loading]="buttonAtributes.loading"
              [disabled]="buttonAtributes.disabled"
              [circularButton]="buttonAtributes.circularButton"
            ></ion-button>
          </td>
        </tr>
      </table>

      <ion-divider type="text" label="cards"></ion-divider>

      <div class="flex">
        <ion-card [configuration]="cardConfiguration"></ion-card>
      </div>

      <ion-divider type="text" label="chips"></ion-divider>

      <div class="flex-col">
        <div class="flex" *ngFor="let size of chipSizes">
          <ion-chip [label]="'chip ' + size" [size]="size"></ion-chip>
          <ion-chip
            [label]="'chip ' + size"
            [size]="size"
            [selected]="true"
          ></ion-chip>
          <ion-chip
            [label]="'chip ' + size"
            [size]="size"
            [disabled]="true"
          ></ion-chip>
        </div>
      </div>
    </main>
  `,
  styleUrls: ['./theme-demo.component.scss'],
})
export class ThemeDemoComponent {
  public ionThemes = IonThemes;
  public object = Object;

  public buttonAtributes = {
    danger: false,
    loading: false,
    disabled: false,
    rightSideIcon: true,
    circularButton: false,
  };

  switchSizeOptions = ['sm', 'md', 'lg'];

  buttonSizeOptions = ['sm', 'md', 'lg', 'xl'];
  buttonVariantOptions = ['primary', 'secondary', 'ghost', 'dashed'];

  alertVariantOptions = ['success', 'warning', 'negative', 'info'];

  avatarSizeOption = ['xs', 'sm', 'md', 'lg'];

  badgeTypes = ['primary', 'secondary', 'neutral', 'negative'];

  chipSizes = ['sm', 'md'];

  breadcrumbs = [
    { label: 'Home', link: '/home' },
    { label: 'Recursos', link: '/recursos' },
    { label: 'Técnico', link: '/recursos/1' },
  ];

  bigBreadcrumbs = Array.from({ length: 10 }, (_, i) => ({
    label: `Breadcrumb ${i}`,
    link: `/breadcrumb/${i}`,
  }));

  cardConfiguration: IonCard = {
    header: {
      title: 'Card Title',
      chips: [{ label: 'Chip 1' }, { label: 'Chip 2' }, { label: 'Chip 3' }],
      icon: 'box',
      infoTooltip: {
        ionTooltipTitle: 'This is a tooltip',
        ionTooltipPosition: TooltipPosition.BOTTOM_CENTER,
      },
    },
    body: BodyMockComponent,
    footer: {
      buttons: {
        primary: {
          label: 'Confirm',
        },
        secondary: {
          label: 'Cancel',
        },
      },
    },
  };

  constructor(private readonly ionThemeService: IonThemeService) {}

  public handleSwitch(key: string, value: boolean): void {
    this.buttonAtributes[key] = value;
  }

  public setTheme(theme: IonThemes): void {
    this.ionThemeService.theme = theme;
  }
}
