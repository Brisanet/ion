import { Component } from '@angular/core';

import { BodyMockComponent } from '../../card/mock/body-mock.component';
import {
  BadgeType,
  BreadcrumbItem,
  ChipSize,
  DropdownItem,
  IonButtonProps,
  IonCard,
  Size,
  StatusType,
  SwitchSize,
  TooltipPosition,
  Type,
} from '../../core/types';
import { SizeType } from '../../core/types/size';
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

      <ion-divider type="text" label="alert"></ion-divider>

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

      <ion-divider type="text" label="avatar"></ion-divider>

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

      <ion-divider type="text" label="badge"></ion-divider>

      <div>
        <div class="flex" *ngFor="let type of badgeTypes">
          <ion-badge [type]="type" [value]="10"></ion-badge>
          <ion-badge [type]="type" label="teste"></ion-badge>
        </div>
      </div>

      <ion-divider type="text" label="breadcrumb"></ion-divider>

      <ion-breadcrumb [breadcrumbs]="breadcrumbs"></ion-breadcrumb>
      <ion-breadcrumb [breadcrumbs]="bigBreadcrumbs"></ion-breadcrumb>

      <ion-divider type="text" label="button + switch"></ion-divider>

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

      <ion-divider type="text" label="card"></ion-divider>

      <div class="flex">
        <ion-card [configuration]="cardConfiguration"></ion-card>
      </div>

      <ion-divider type="text" label="chip"></ion-divider>

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

      <ion-divider type="text" label="dropdown"></ion-divider>

      <div class="flex" style="position: relative; height: 250px;">
        <ion-dropdown
          description="Hello, dropdown!"
          [options]="dropdownOptions"
        ></ion-dropdown>
      </div>

      <ion-divider></ion-divider>
    </main>
  `,
  styleUrls: ['./theme-demo.component.scss'],
})
export class ThemeDemoComponent {
  public ionThemes = IonThemes;
  public object = Object;

  public alertVariantOptions: StatusType[] = [
    'success',
    'warning',
    'negative',
    'info',
  ];

  public avatarSizeOption: SizeType[] = ['xs', 'sm', 'md', 'lg'];

  public badgeTypes: BadgeType[] = [
    'primary',
    'secondary',
    'neutral',
    'negative',
  ];

  public breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', link: '/home' },
    { label: 'Recursos', link: '/recursos' },
    { label: 'Técnico', link: '/recursos/1' },
  ];
  public bigBreadcrumbs: BreadcrumbItem[] = Array.from(
    { length: 10 },
    (_, i) => ({ label: `Breadcrumb ${i}`, link: `/breadcrumb/${i}` })
  );

  public buttonSizeOptions: Size[] = ['sm', 'md', 'lg', 'xl'];
  public buttonVariantOptions: Type[] = [
    'primary',
    'secondary',
    'ghost',
    'dashed',
  ];
  public buttonAtributes: Partial<Record<keyof IonButtonProps, boolean>> = {
    danger: false,
    loading: false,
    disabled: false,
    rightSideIcon: true,
    circularButton: false,
  };

  public cardConfiguration: IonCard = {
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
        primary: { label: 'Confirm' },
        secondary: { label: 'Cancel' },
      },
    },
  };

  public chipSizes: ChipSize[] = ['sm', 'md'];

  public dropdownOptions: DropdownItem[] = [
    { label: 'Encomendas', selected: false, icon: 'box' },
    { label: 'Bancos', selected: false, icon: 'bank' },
    { label: 'Conquistas', selected: false, icon: 'award' },
    { label: 'Teste', selected: false, icon: 'box', disabled: true },
  ];

  public switchSizeOptions: SwitchSize[] = ['sm', 'md', 'lg'];

  constructor(private readonly ionThemeService: IonThemeService) {}

  public handleSwitch(key: string, value: boolean): void {
    this.buttonAtributes[key] = value;
  }

  public setTheme(theme: IonThemes): void {
    this.ionThemeService.theme = theme;
  }
}
